import Table from '@/app/components/Table';
import { StreamLink } from '@/types/interface';
import { getStreams } from '@/utilities/actions';

export default async function Home() {
  const streams: StreamLink[] = await getStreams('entertainment');

  return <div>{<Table data={streams}></Table>}</div>;
}
