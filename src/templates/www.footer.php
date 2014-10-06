<?
$navigation = 0; //session()->value("navigation_main");
// or get complete structure from system
if(!$navigation) {

	$NC = new Navigation();
	$navigation = $NC->getNavigations(array("handle" => "main"));

	session()->value("navigation_main", $navigation);

}
?>
	</div>

	<div id="navigation">
		<ul class="navigation">
<?			foreach($navigation["nodes"] as $node): ?>
			<li<?= $HTML->attribute("class", $node["classname"]) ?>><a href="<?= ($node["link"] ? $node["link"] : ("/page/".$node["sindex"])) ?>"<?= strpos($node["link"], "http://") === 0 ? $HTML->attribute("target", "_blank") : "" ?>><?= $node["name"] ?></a></li>
<?			endforeach; ?>

			<!--li class="front"><a href="/">Frontpage</a></li>
			<li class="blog"><a href="/blog">bLog</a></li>
			<li class="manifest"><a href="/manifest">Manifest</a></li>
			<li class="about"><a href="/about">About</a></li-->
		</ul>
	</div>

	<div id="footer">
		<p>&lt;aliens&gt;we are all&lt;/aliens&gt;</p>
	</div>

</div>

</body>
</html>