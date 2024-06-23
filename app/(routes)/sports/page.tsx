import Table from '@/app/components/Table';
import { StreamLink } from '@/types/interface';
import { getStreams } from '@/utilities/functions/auth';

export default async function Home() {
  const streams: StreamLink[] = await getStreams('sports');

  return <div>{<Table data={streams}></Table>}</div>;
}
