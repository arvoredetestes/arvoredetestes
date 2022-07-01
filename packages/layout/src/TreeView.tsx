import { useData as useFeatures } from "@monorepo/store/src/feature/retrieve";
import { useSetDashboardSelection } from "@monorepo/store/src/global";
import { useReloadEverythingOnMount } from "@monorepo/store/src/integration/hooks";
import { useData as useTestCases } from "@monorepo/store/src/test-case/retrieve";
import { useData as useTestExecutions } from "@monorepo/store/src/test-execution/retrieve";
import { useData as useTestScripts } from "@monorepo/store/src/test-script/retrieve";
import { useGetUserById } from "@monorepo/store/src/user/users";
import { Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { TestExecution } from "@monorepo/types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeViewMUI from "@mui/lab/TreeView";
import dayjs from "dayjs";
import { filter, groupBy, keys } from "lodash";
import map from "lodash/map";
import * as React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { U } from "ts-toolbelt";
import { useDeepCompareCallback } from "use-deep-compare";

function renderTree(items: any[]) {
  return map(items, (item) => {
    if (item.children)
      return (
        <TreeItem nodeId={item.id} key={item.id} label={item.name}>
          {renderTree(item.children)}
        </TreeItem>
      );
    else {
      return <TreeItem key={item.id} nodeId={item.id} label={item.name} />;
    }
  });
}
const SX = {
  height: 240,
  flexGrow: 1,
  maxWidth: 400,
  overflowY: "auto",
};
const BOLD = {
  fontWeight: "bold",
};
function useTreeData() {
  useReloadEverythingOnMount();
  const getUserById = useGetUserById();
  const features = useFeatures();
  const testCases = useTestCases();
  const testExecutions = useTestExecutions();
  const testScripts = useTestScripts();
  return useMemo(
    () =>
      map(features, (ft) => {
        function filterAndMap(items: U.Nullable<any[]>, route: string) {
          return map(
            filter(items, (item) => {
              return item.featureId === ft._id;
            }),
            (tcc) => ({
              name: tcc.name,
              id: `/feature/${ft._id}/${route}/${tcc._id}`,
              children: [],
            })
          );
        }
        function filterTEAndMap(
          items: U.Nullable<TestExecution[]>,
          route: string
        ) {
          const dates = groupBy(
            items,
            (item) =>
              dayjs(item.executionDate).format("DD/MMMM/YYYY") +
              " - " +
              getUserById(item.executedBy)?.name
          );
          const datesKeys = keys(dates);
          return map(datesKeys, (key) => ({
            name: key,
            id: key,
            children: map(dates[key], (item) => ({
              name: item.name,
              id: `/feature/${ft._id}/${route}/${item._id}`,
              children: [],
            })),
          }));

          // return map(
          //   filter(items, (item) => {
          //     return item.featureId === ft._id;
          //   }),
          //   (tcc) => ({
          //     name:
          //       dayjs(tcc.executionDate).format("DD/MMMM/YYYY") +
          //       " " +
          //       tcc.name,
          //     id: `/feature/${ft._id}/${route}/${tcc._id}`,
          //     children: [],
          //   })
          // );
        }
        const featureTestCases = filterAndMap(testCases, "test-case");
        const featureTestExecutions = filterTEAndMap(
          testExecutions,
          "test-execution"
        );
        const featureTestScripts = filterAndMap(testScripts, "test-script");

        return {
          name: ft.name,
          id: `/feature/${ft._id}`,
          children: [
            {
              name: <Text messageKey={TEXT_KEYS.TEST_CASES} sx={BOLD} />,
              id: `/feature/${ft._id}/test-cases`,
              children: featureTestCases,
            },
            {
              name: <Text messageKey={TEXT_KEYS.TEST_EXECUTIONS} sx={BOLD} />,
              id: `/feature/${ft._id}/test-executions`,
              children: featureTestExecutions,
            },
            {
              name: <Text messageKey={TEXT_KEYS.TEST_SCRIPTS} sx={BOLD} />,
              id: `/feature/${ft._id}/test-scripts`,
              children: featureTestScripts,
            },
          ],
        };
      }),
    [features, getUserById, testCases, testExecutions, testScripts]
  );
}

function useOnNodeFocus() {
  const setDashboardSelection = useSetDashboardSelection();
  const navigate = useNavigate();
  return useDeepCompareCallback(
    (e: React.SyntheticEvent, nodeId: string) => {
      navigate(nodeId);
      setDashboardSelection({ id: nodeId }, null);
    },
    [setDashboardSelection]
  );
}
export const TreeView: React.FC = () => {
  const treeData = useTreeData();
  const onNodeSelect = useOnNodeFocus();
  return (
    <TreeViewMUI
      aria-label='file system navigator'
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={SX}
      onNodeFocus={onNodeSelect}
    >
      {renderTree(treeData)}
    </TreeViewMUI>
  );
};

// @ts-ignore
TreeView.whyDidYouRender = true;
