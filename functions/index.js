const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_req, res, next) => {
	res.setHeader('Content-Type', 'application/json; charset=UTF-8');
	res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
	res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
	res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
	res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
	res.setHeader('Cache-Control', 'private');
	res.setHeader(
		'Content-Security-Policy',
		"default-src 'self' fir-attendance-list-default-rtdb.firebaseio.com s-usc1c-nss-200.firebaseio.com; frame-ancestors 'self' *.firebaseio.com; object-src 'none'; base-uri 'none';",
	);
	next();
});

require('dotenv').config();
const config = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
};

admin.initializeApp(config);
const db = admin.database();
const ref = db.ref('/');
const newEventsRef = ref.child('new_events');
const covidsRef = ref.child('covids');
const usersRef = ref.child('users');

const calculateId = (state) => {
	let id = 1;
	let max = 1;
	if (state.length > 0) {
		state.forEach((item) => {
			if (item.id && max < item.id) {
				max = item.id;
			}
		});
		id = max + 1;
	}
	return id;
};

// UPDATE parts
app.put('/api/parts', (req, res) => {
	const { parts } = req.body;
	ref.update({ new_parts: parts });
	res.send('Success.');
});

// CREATE event
app.post('/api/events', (req, res) => {
	const { event } = req.body;
	let id;
	// eventsの作成
	newEventsRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((events) => {
			// eventsがない場合の処理
			if (!events) {
				id = 1;
				ref.update({ new_events: [{ ...event, id }] });
			} else {
				id = calculateId(events);
				ref.update({ new_events: [...events, { ...event, id }] });
			}
			res.json({ event: { ...event, id } });
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed create event.');
		});
	// usersの作成
	usersRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((users) => {
			// usersがない場合の処理
			if (!users) {
				ref.update({ users: [{ eventId: id }] });
			} else {
				ref.update({ users: [...users, { eventId: id }] });
			}
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed.');
		});
	// covidsの作成
	covidsRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((covids) => {
			// covidsがない場合の処理
			if (!covids) {
				ref.update({ covids: [{ eventId: id }] });
			} else {
				ref.update({ covids: [...covids, { eventId: id }] });
			}
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed.');
		});
});

// UPDATE event
app.put('/api/events', (req, res) => {
	const { event } = req.body;

	newEventsRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((events) => {
			const newEvents = events.map((evnt) => {
				if (evnt.id === event.id) {
					return event;
				}
				return evnt;
			});
			ref.update({ new_events: newEvents });
			res.json({ event });
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed update event.');
		});
});

// DELETE event
app.delete('/api/events/:id', (req, res) => {
	const id = parseInt(req.params.id);

	newEventsRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((events) => {
			const newEvents = events.filter((evnt) => {
				return id !== evnt.id;
			});
			ref.update({ new_events: newEvents });
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed delete event.');
		});

	// usersの削除
	usersRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((users) => {
			const newUsers = users.filter((usr) => {
				return usr.eventId !== id;
			});
			ref.update({ users: newUsers });
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed.');
		});
	// covidsの削除
	covidsRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((covids) => {
			const newCovids = covids.filter((cvd) => {
				return cvd.eventId !== id;
			});
			ref.update({ covids: newCovids });
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed.');
		});
	res.send('Success.');
});

// UPDATE covid
app.put('/api/covids', (req, res) => {
	const { eventId, response } = req.body;

	covidsRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((covids) => {
			const newCovids = covids.map((covid) => {
				if (covid.eventId === eventId) {
					if (covid.responses) {
						return {
							eventId,
							responses: [...covid.responses, response],
						};
					}
					return {
						eventId,
						responses: [response],
					};
				}
				return covid;
			});
			ref.update({ covids: newCovids });
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed update covid.');
		});
	res.send('Success');
});

// CREATE user
app.post('/api/users', (req, res) => {
	const { eventId, user } = req.body;
	usersRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((users) => {
			const target = users.find((item) => {
				return item.eventId === eventId;
			});
			let newUsers;
			if (target.users) {
				newUsers = [
					...target.users,
					{ ...user, id: calculateId(target.users) },
				];
			} else {
				newUsers = [{ ...user, id: 1 }];
			}
			const result = users.map((item) => {
				if (item.eventId === eventId) {
					return { eventId, users: [...newUsers] };
				}
				return item;
			});
			ref.update({ users: result });
		});
	res.send('Success');
});

// UPDATE user
app.put('/api/users', (req, res) => {
	const { eventId, user } = req.body;

	usersRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((users) => {
			const target = users.find((item) => {
				return item.eventId === eventId;
			});
			const newUsers = target.users.map((usr) => {
				if (usr.id === user.id) {
					return user;
				}
				return usr;
			});
			const result = users.map((item) => {
				if (item.eventId === eventId) {
					return { eventId, users: [...newUsers] };
				}
				return item;
			});
			ref.update({ users: result });
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed update user.');
		});
	res.send('Success');
});

// UPDATE roles
app.put('/api/roles', (req, res) => {
	const { eventId, users } = req.body;

	usersRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((usrs) => {
			const newUsers = usrs.map((usr) => {
				if (usr.eventId === eventId) {
					return { ...usr, users };
				}
				return usr;
			});
			ref.update({ users: newUsers });
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed update roles.');
		});
	res.send('Success');
});

// DELETE user
app.delete('/api/users', (req, res) => {
	const eventId = parseInt(req.query.eventId);
	const userId = parseInt(req.query.userId);
	usersRef
		.once('value')
		.then((snapshot) => {
			return snapshot.val();
		})
		.then((usrs) => {
			const targetUsers = usrs.find((usr) => {
				return usr.eventId === eventId;
			});
			const users = targetUsers.users.filter((usr) => {
				return usr.id !== userId;
			});
			const newUsers = { eventId, users };
			const result = usrs.map((usr) => {
				if (usr.eventId === eventId) {
					return newUsers;
				}
				return usr;
			});
			ref.update({ users: [...result] });
		})
		.catch((err) => {
			console.log(err);
			return res.send('Failed delete user.');
		});
	res.send('Success.');
});

const api = functions.https.onRequest(app);
module.exports = { api };
