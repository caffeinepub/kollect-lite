import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Activity, Case, Document } from "../backend";
import { useActor } from "./useActor";

export function useGetCases() {
  const { actor, isFetching } = useActor();

  return useQuery<Case[]>({
    queryKey: ["cases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCase(caseId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Case | null>({
    queryKey: ["case", caseId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCase(caseId);
    },
    enabled: !!actor && !isFetching && !!caseId,
  });
}

export function useGetCaseActivities(caseId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Activity[]>({
    queryKey: ["activities", caseId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCaseActivities(caseId);
    },
    enabled: !!actor && !isFetching && !!caseId,
  });
}

export function useAddActivity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      caseId,
      activity,
    }: { caseId: string; activity: Activity }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addActivity(caseId, activity);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["activities", variables.caseId],
      });
    },
  });
}

export function useGetCaseDocuments(caseId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Document[]>({
    queryKey: ["documents", caseId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCaseDocuments(caseId);
    },
    enabled: !!actor && !isFetching && !!caseId,
  });
}

export function useAddDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      caseId,
      document,
    }: { caseId: string; document: Document }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addDocument(caseId, document);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["documents", variables.caseId],
      });
    },
  });
}
