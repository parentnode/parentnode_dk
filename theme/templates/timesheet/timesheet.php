<?php
global $itemtype;
global $model;
global $action;

$IC = new Items();
include_once("classes/helpers/timesheets.class.php");
$TC = new TimesheetsGateway();


if($action && count($action) == 2 && $action[0] == "uuid") {
	$uuid = $action[1];
	$projects = $model->getProjects(["timesheetuuid" => $uuid]);
}
else {

	// get projects with current user as editor
	$projects = $model->getProjects(["editor_id" => session()->value("user_id")]);
}

if($projects) {
	foreach ($projects as $key => $project) {
		
		// prepare for entries
		$projects[$key]["billed_entries"] = [];
		$projects[$key]["complimentary_entries"] = [];
		$projects[$key]["pending_entries"] = [];
		
		// create list of project ids
		$project_ids_arr[] = $project["project_id"];
	}
	$project_ids = implode(",", $project_ids_arr);
	
	// get 1 year of reports for these projects 
	$entries = $TC->getReports(["project_ids" => $project_ids, "since" => gmdate("c", strtotime("-1 year")), "until" => gmdate("c", time())]);
	foreach ($entries as $entry) {
		
		// entry has tags
		if($entry->tags) {
			
			// entry has been billed
			if(array_search("Afregnet", $entry->tags) !== false || array_search("afregnet", $entry->tags) !== false) {
				
				$projects[arrayKeyValue($projects, "project_id", $entry->pid)]["billed_entries"][] = $entry;
			}
			// entry is on the house
			elseif(array_search("Afskrevet", $entry->tags) !== false || array_search("afskrevet", $entry->tags) !== false) {
				
				$projects[arrayKeyValue($projects, "project_id", $entry->pid)]["complimentary_entries"][] = $entry;
			}
			
		}
		// entry has no tags, and is therefore pending
		else {
			
			$projects[arrayKeyValue($projects, "project_id", $entry->pid)]["pending_entries"][] = $entry;
	
		}

	}
}


?>


<div class="scene timesheet i:scene">
	<h1>Timesheet</h1>

	<? if($projects): ?>

	<div class="pending">
		<h2>Pending hours</h2>
		<? 
		$pending_total_rounded_hours = 0;
		$pending_total_rounded_hours_15 = 0;
		$pending_total_rounded_hours_60 = 0;
		?>
		<ul class="items projects">
			<? foreach($projects as $project):
				$project_pending_total = 0;
				$project_pending_total_rounded_15 = 0;
				if($project["pending_entries"]): ?>
			<li class="item project">
				<h3><?= $project["client_name"] ?>, <?= $project["name"] ?></h3>
				<ul class="pending_entries">
					<? foreach($project["pending_entries"] as $pending_entry):

						$pending_entry_duration = round($pending_entry->dur/1000/60);

						$pending_entry_duration_15 = ($pending_entry_duration%15 ? 15 - $pending_entry_duration%15 : 0) + $pending_entry_duration;
						$pending_entry_duration_60 = ($pending_entry_duration%60 ? 60 - $pending_entry_duration%60 : 0) + $pending_entry_duration;

						$project_pending_total = $project_pending_total + $pending_entry_duration;

						$project_pending_total_rounded = $project_pending_total;
						$project_pending_total_rounded_15 = $project_pending_total_rounded_15 + $pending_entry_duration_15;
						$project_pending_total_rounded_60 = $project_pending_total_rounded_60 + $pending_entry_duration_60;
						if($project["show_history"]): ?>
					<li class="pending_entry">
						<span class="date"><?= date("d/m/Y", strtotime($pending_entry->start)) ?></span> – 

						<? if($project["summary_method"] == 1): ?>
						<span class="duration"><span class="minutes"><?= $pending_entry_duration ?></span> min.</span> –
						<? elseif($project["summary_method"] == 15): ?>
						<span class="duration"><span class="minutes"><?= $pending_entry_duration_15 ?></span> min.</span> –
						<? else: ?>
						<span class="duration"><span class="minutes"><?= $pending_entry_duration_60 ?></span> min.</span> –
						<? endif; ?>

						<span class="description"><?= $pending_entry->description ?></span>
					</li>
					<? endif; 
					endforeach;

					$project_pending_total_rounded_hours = ceil($project_pending_total_rounded/60);
					$pending_total_rounded_hours += $project_pending_total_rounded_hours; 

					$project_pending_total_rounded_hours_15 = ceil($project_pending_total_rounded_15/60);
					$pending_total_rounded_hours_15 += $project_pending_total_rounded_hours_15; 

					$project_pending_total_rounded_hours_60 = ceil($project_pending_total_rounded_60/60);
					$pending_total_rounded_hours_60 += $project_pending_total_rounded_hours_60; 
					?>
				</ul>
				<h6 class="total">TOTAL: 
					<!--<span class="hours"><?= ceil($project_pending_total/60) ?></span> hours (<span class="minutes"><?= $project_pending_total ?></span> min.) / -->
					<? if($project["summary_method"] == 1): ?>
					<span title="By the minute" class="hours"><?= $project_pending_total_rounded_hours ?></span> hours (<span class="minutes"><?= $project_pending_total_rounded ?></span> min.)</h6>
					<? elseif($project["summary_method"] == 15): ?>
					<span title="By 15 minute increments" class="hours15"><?= $project_pending_total_rounded_hours_15 ?></span> hours (<span class="minutes15"><?= $project_pending_total_rounded_15 ?></span> min.)</h6>
					<? else: ?>
					<span title="By 60 minute increments" class="hours60"><?= $project_pending_total_rounded_hours_60 ?></span> hours (<span class="minutes60"><?= $project_pending_total_rounded_60 ?></span> min.)</h6>
					<? endif; ?>
			</li>
			<? endif;
			endforeach; ?>
		</ul>
		<h5 class="total pending hours">PENDING HOURS, TOTAL: 
			<? if($project["summary_method"] == 1): ?>
			<span title="By the minute" class="hours"><?= $pending_total_rounded_hours ?></span> hours
			<? elseif($project["summary_method"] == 15): ?>
			<span title="By 15 minute increments" class="hours15"><?= $pending_total_rounded_hours_15 ?></span> hours
			<? else: ?>
			<span title="By 60 minute increments" class="hours60"><?= $pending_total_rounded_hours_60 ?></span> hours
			<? endif; ?>
		</h5>
	</div>

	<div class="processed">
		<? 
		$billed_total_rounded_hours = 0;
		$complimentary_total_rounded_hours = 0;
		foreach($projects as $project):
			$project_billed_total = 0;
			$project_billed_total_rounded = 0;
			$project_billed_total_rounded_hours = 0;

			$project_complimentary_total = 0;
			$project_complimentary_total_rounded = 0;
			$project_complimentary_total_rounded_hours = 0;
			if($project["billed_entries"] || $project["complimentary_entries"]):

				if($project["billed_entries"]) {
					foreach ($project["billed_entries"] as $billed_entry) {
						$billed_entry_duration = round($billed_entry->dur/1000/60);
						$project_billed_total = $project_billed_total + $billed_entry_duration;
						$project_billed_total_rounded = $project_billed_total_rounded + ($billed_entry_duration%15 ? 15 - $billed_entry_duration%15 : 0) + $billed_entry_duration;
						$project_billed_total_rounded_hours = ceil($project_billed_total_rounded/60);
					}	
				}
		
				if($project["complimentary_entries"]) {
					foreach ($project["complimentary_entries"] as $complimentary_entry) {
						$complimentary_entry_duration = round($complimentary_entry->dur/1000/60);
						$project_complimentary_total = $project_complimentary_total + $complimentary_entry_duration;
						$project_complimentary_total_rounded = $project_complimentary_total_rounded + ($complimentary_entry_duration%15 ? 15 - $complimentary_entry_duration%15 : 0) + $complimentary_entry_duration;
						$project_complimentary_total_rounded_hours = ceil($project_complimentary_total_rounded/60);
					}	
				}
				$billed_total_rounded_hours += $project_billed_total_rounded_hours; 
				$complimentary_total_rounded_hours += $project_complimentary_total_rounded_hours; 
			endif;
		endforeach; ?>
		<h5 class="total billed hours">PREVIOUSELY BILLED HOURS, TOTAL: <span class="hours"><?= $billed_total_rounded_hours ?></span> hours</h5>
		<h5 class="total complimentary hours">COMPLIMENTARY HOURS (ON THE HOUSE), TOTAL: <span class="hours"><?= $complimentary_total_rounded_hours ?></span> hours</h5>

	</div>

	<? else: ?>

		<p>No projects</p>

	<? endif; ?>

</div>
