import Table from '@/app/components/Display/Table';
import { getStreams } from '@/utilities/api/stream';

export default async function Home() {
  const response = await getStreams('entertainment');

  if (response.error) {
    return <div>{response.message}</div>;
  }

  return <div>{<Table data={response.body}></Table>}</div>;
}
