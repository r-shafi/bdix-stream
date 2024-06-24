import { getStreams } from '@/utilities/api/stream';
import Table from './components/Display/Table';

export default async function Home() {
  const response: any = await getStreams();

  if (response.error) {
    return <div>{response.message}</div>;
  }

  return <div>{<Table data={response.body}></Table>}</div>;
}
