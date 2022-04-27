<?php
$IC = new Items();
include_once("classes/helpers/timesheets.class.php");
$TC = new TimesheetsGateway;
global $itemtype;
global $model;
global $action;

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
		$projects[$key]["outstanding_entries"] = [];
		
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
			if(array_search("Afregnet", $entry->tags) !== false) {
				
				$projects[arrayKeyValue($projects, "project_id", $entry->pid)]["billed_entries"][] = $entry;
			}
			// entry is on the house
			elseif(array_search("Afskrevet", $entry->tags) !== false) {
				
				$projects[arrayKeyValue($projects, "project_id", $entry->pid)]["complimentary_entries"][] = $entry;
			}
			
		}
		// entry has no tags, and is therefore outstanding
		else {
			
			$projects[arrayKeyValue($projects, "project_id", $entry->pid)]["outstanding_entries"][] = $entry;
	
		}

	}
}


?>


<div class="scene timesheet i:scene">
	<h1>Timesheet</h1>
	<? if($projects): ?>
	<h2>Outstanding hours</h2>
		<? 
		$outstanding_total_rounded_hours = 0;
		?>
		<ul class="projects">
			<? foreach($projects as $project): ?>
			<? 
			$project_outstanding_total = 0;
			$project_outstanding_total_rounded = 0;
			?>
			<? if($project["outstanding_entries"]): ?>
			
			<li class="project">
				<h3><?= $project["name"] ?></h3>
				<ul class="outstanding_entries">
					<? foreach($project["outstanding_entries"] as $outstanding_entry): ?>
						<? 	
					$outstanding_entry_duration = round($outstanding_entry->dur/1000/60);					
					$project_outstanding_total = $project_outstanding_total + $outstanding_entry_duration;
					$project_outstanding_total_rounded = $project_outstanding_total_rounded + ($outstanding_entry_duration%15 ? 15 - $outstanding_entry_duration%15 : 0) + $outstanding_entry_duration;
					?>
					<? if($project["show_history"]): ?>
					<li class="outstanding_entry">
						<span class="date"><?= date("d/m/Y", strtotime($outstanding_entry->start)) ?></span>
						<span class="duration"><span class="minutes"><?= round($outstanding_entry->dur/1000/60) ?></span> min.</span>
						<span class="description"><?= $outstanding_entry->description ?></span>
					</li>
					<? endif; ?>
					<? endforeach; ?>
					<? 
					$project_outstanding_total_rounded_hours = ceil($project_outstanding_total_rounded/60);
					$outstanding_total_rounded_hours += $project_outstanding_total_rounded_hours; 
					?>
				</ul>
				<h6 class="total">TOTAL: <!-- <span class="hours"><?= ceil($project_outstanding_total/60) ?></span> hours (<span class="minutes"><?= $project_outstanding_total ?></span> min.) / --><span class="hours15"><?= $project_outstanding_total_rounded_hours ?></span> hours (<span class="minutes15"><?= $project_outstanding_total_rounded ?></span> min.)</h6>
			</li>
			<? endif; ?>
			<? endforeach; ?>
		</ul>
		<h5 class="total outstanding hours">OUTSTANDING HOURS, TOTAL: <span class="hours"><?= $outstanding_total_rounded_hours ?></span> hours</h5>

	<h2>Processed hours</h2>
		<? 
		$billed_total_rounded_hours = 0;
		$complimentary_total_rounded_hours = 0;
		?>
		<ul class="projects">
			<? foreach($projects as $project): ?>
			<? 
			$project_billed_total = 0;
			$project_billed_total_rounded = 0;
			$project_billed_total_rounded_hours = 0;

			$project_complimentary_total = 0;
			$project_complimentary_total_rounded = 0;
			$project_complimentary_total_rounded_hours = 0;
			?>
			<? if($project["billed_entries"] || $project["complimentary_entries"]): ?>
			<h3><?= $project["name"] ?></h3>
			<li class="project">
			<? 
			
			if($project["billed_entries"]){
				foreach ($project["billed_entries"] as $billed_entry) {
					$billed_entry_duration = round($billed_entry->dur/1000/60);					
					$project_billed_total = $project_billed_total + $billed_entry_duration;
					$project_billed_total_rounded = $project_billed_total_rounded + ($billed_entry_duration%15 ? 15 - $billed_entry_duration%15 : 0) + $billed_entry_duration;
					$project_billed_total_rounded_hours = ceil($project_billed_total_rounded/60);
				}	
			}
			
			if($project["complimentary_entries"]){
				foreach ($project["complimentary_entries"] as $complimentary_entry) {
					$complimentary_entry_duration = round($complimentary_entry->dur/1000/60);					
					$project_complimentary_total = $project_complimentary_total + $complimentary_entry_duration;
					$project_complimentary_total_rounded = $project_complimentary_total_rounded + ($complimentary_entry_duration%15 ? 15 - $complimentary_entry_duration%15 : 0) + $complimentary_entry_duration;
					$project_complimentary_total_rounded_hours = ceil($project_complimentary_total_rounded/60);
				}	
			}
			?>
			<!-- <h5>Billed hours: <?= $project_billed_total_rounded_hours ?></h5> -->
			<? 
			$billed_total_rounded_hours += $project_billed_total_rounded_hours; 
			$complimentary_total_rounded_hours += $project_complimentary_total_rounded_hours; 
			?>
				<h6 class="total">Billed: <!-- <span class="hours"><?= ceil($project_billed_total/60) ?></span> hours (<span class="minutes"><?= $project_billed_total ?></span> min.) / --><span class="hours15"><?= $project_billed_total_rounded_hours ?></span> hours (<span class="minutes15"><?= $project_billed_total_rounded ?></span> min.)</h6>
				<h6 class="total">Complimentary: <!-- <span class="hours"><?= ceil($project_complimentary_total/60) ?></span> hours (<span class="minutes"><?= $project_complimentary_total ?></span> min.) / --><span class="hours15"><?= $project_complimentary_total_rounded_hours ?></span> hours (<span class="minutes15"><?= $project_complimentary_total_rounded ?></span> min.)</h6>
			<!-- Insert complimentary entries here -->
			</li>
			<? endif; ?>
			<? endforeach; ?>
		</ul>
		<h5 class="total billed hours">BILLED HOURS, TOTAL: <span class="hours"><?= $billed_total_rounded_hours ?></span> hours</h5>
		<h5 class="total complimentary hours">COMPLIMENTARY HOURS (ON THE HOUSE), TOTAL: <span class="hours"><?= $complimentary_total_rounded_hours ?></span> hours</h5>
	<? else: ?>
		<p>No projects</p>
	<? endif; ?>

</div>
