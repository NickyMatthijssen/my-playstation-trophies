import {NextResponse} from "next/server";
import { syncQueue } from "~/queue/sync.queue";
import {JobName} from "~/enums/job-name.enum";

async function handler(): Promise<NextResponse> {
    await syncQueue.add(JobName.PrepareTitleImport, {});

    return NextResponse.json({success: true});
}

export { handler as GET, handler as POST };
