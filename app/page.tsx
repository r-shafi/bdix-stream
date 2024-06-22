import { StreamLink } from '@/types/interface';
import { getStreams } from '@/utilities/actions';
import Table from './components/Table';

export default async function Home() {
  const streams: StreamLink[] = await getStreams();

  return <div>{<Table data={streams}></Table>}</div>;
}
