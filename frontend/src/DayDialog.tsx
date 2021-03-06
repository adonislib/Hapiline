import {Dialog} from "@reach/dialog";
import {useLocation} from "react-router-dom";
import React from "react";
import * as UI from "./ui";
import {Tabs, TabList, Tab, TabPanels, TabPanel} from "@reach/tabs";
import {DayCellWithFullStats} from "./models";
import {useQueryParams} from "./hooks/useQueryParam";
import {useDocumentTitle} from "./hooks/useDocumentTitle";
import {HabitTab} from "./HabitTab";
import {JournalTab} from "./JournalTab";
import {formatDayName} from "./services/date-formatter";
import {useMediaQuery, MEDIA_QUERY} from "./ui/breakpoints";
import {useDayDialogTabIndex} from "./hooks/useDayDialogTabIndex";

type DayDialogProps = Omit<DayCellWithFullStats, "styles" | "numberOfCreatedHabits"> & {
	onResolve: VoidFunction;
};

export const DayDialog: React.FC<DayDialogProps> = ({day, onResolve, ...stats}) => {
	useDocumentTitle(`Hapiline - ${day}`);
	const location = useLocation<{from: string | undefined}>();
	const [queryParams, updateQueryParams] = useQueryParams();

	const [tabIndex, setTabIndex] = useDayDialogTabIndex();

	const mediaQuery = useMediaQuery();

	function dismissDialog() {
		updateQueryParams(location?.state?.from ?? location.pathname, {
			month_offset: queryParams.month_offset,
		});
	}

	return (
		<Dialog
			data-width="view-l"
			data-lg-width="auto"
			data-lg-mx="6"
			data-mt="48"
			data-lg-mt="12"
			data-mb="0"
			data-overflow="auto"
			style={{maxHeight: mediaQuery === MEDIA_QUERY.default ? "calc(90vh - 48px)" : "95vh"}}
			aria-label="Show day preview"
			onDismiss={dismissDialog}
		>
			<UI.Row bg="gray-1" p={["24", "6"]} mainAxis="between">
				<UI.Header variant="small">
					{day} - {formatDayName(day)}
				</UI.Header>
				<UI.CloseIcon onClick={dismissDialog} />
			</UI.Row>

			<Tabs data-mt="12" index={tabIndex} onChange={setTabIndex}>
				<TabList>
					<Tab as={UI.Button} variant="bare">
						Habits
					</Tab>
					<Tab as={UI.Button} variant="bare" ml="12">
						Journal
					</Tab>
				</TabList>
				<TabPanels data-mt="6">
					<TabPanel>
						<HabitTab day={day} onResolve={onResolve} {...stats} />
					</TabPanel>
					<TabPanel>
						<JournalTab day={new Date(day)} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Dialog>
	);
};
