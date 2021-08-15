export interface FirebaseUser extends Partial<firebase.default.User> {
  uid: string;
  email: string | null;
}

export const mapUserData = (user: FirebaseUser): { id: string; email: string } => {
  const { uid, email } = user;
  return {
    id: uid,
    email: email || '',
  };
};
