import { useCallback, useEffect } from "react";

import { useStart as useLoadFeatures } from "../feature/retrieve";
import { useStart as useLoadTestCases } from "../test-case/retrieve";
import { useStart as useLoadTestExecutions } from "../test-execution/retrieve";
import { useStart as useLoadTestScripts } from "../test-script/retrieve";
import { useStart as useLoadVersions } from "../version/retrieve";

export function useReloadEverything(): () => void {
  const loadFeatures = useLoadFeatures();
  const loadTestCases = useLoadTestCases();
  const loadTestExecutions = useLoadTestExecutions();
  const loadTestScripts = useLoadTestScripts();
  const loadVersions = useLoadVersions();
  return useCallback(() => {
    loadFeatures(null);
    loadTestCases(null);
    loadTestExecutions(null);
    loadTestScripts(null);
    loadVersions(null);
  }, [
    loadFeatures,
    loadTestCases,
    loadTestExecutions,
    loadTestScripts,
    loadVersions,
  ]);
}

export function useReloadEverythingOnMount(): void {
  const reload = useReloadEverything();
  useEffect(() => {
    reload();
  }, [reload]);
}
