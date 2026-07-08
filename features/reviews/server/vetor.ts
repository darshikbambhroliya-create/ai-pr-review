import { getPineConeIndex } from "@/features/pinecone/client";
import { CodeChunk } from "../types/review";

const CONTEXT_RESULTS = 10;

export function buildPrNamespace(repoFullName: string, prNumber: number) {
  return `${repoFullName.replace("/", "--")}--pr-${prNumber}`;
}

export async function saveChunksToPinecone(
  namespace: string,
  chunks: CodeChunk[]
) {
  const index = getPineConeIndex();

  const validChunks = chunks.filter(
    (chunk) => chunk.text && chunk.text.trim().length > 0
  );

  if (validChunks.length === 0) {
    console.log("No valid chunks to save");
    return;
  }

  const records = validChunks.map((chunk) => ({
    id: chunk.id,
    text: chunk.text.trim(),
    filePath: chunk.filePath,
  }));

  console.log("Saving records:", records.length);

  await index.namespace(namespace).upsertRecords({
    records,
  });
}
export async function searchPrContext(namespace: string, query: string) {
  const index = getPineConeIndex();

  const response = await index.namespace(namespace).searchRecords({
    query: { topK: CONTEXT_RESULTS, inputs: { text: query } },
  });

  const snippets: string[] = [];

  for (const hit of response.result.hits) {
    const fields = hit.fields as { text?: string; filePath?: string };
    if (!fields.text) {
      continue;
    }

    snippets.push(`File: ${fields.filePath}\n${fields.text}`);
  }

  return snippets;
}
