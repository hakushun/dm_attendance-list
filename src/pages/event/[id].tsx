import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Event } from '../../components/Event';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return { props: { id } };
};
type Props = {
  id: string;
};
const EventPage: NextPage<Props> = ({ id }) => {
  return <Event eventId={typeof id === 'string' ? id : ''} />;
};

export default EventPage;
