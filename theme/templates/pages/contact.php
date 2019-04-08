<?
global $action;
global $IC;


$page_item = $IC->getItem(array("tags" => "page:contact", "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$itemtype = "person";
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position", "extend" => array("tags" => true, "readstate" => true, "mediae" => true, "user" => true)));


?>
<div class="scene contact i:scene">

<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMedia($page_item); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($page_item, [
			"context" => false
		]) ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/contact", [
			"media" => $media,
			"sharing" => true
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>
<? else:?>
	<h1>Contact</h1>
<? endif; ?>


<? if($items): ?>
	<div class="teams">
		<h2>Behind the scenes</h2>
		<ul class="items people">
			
			<? foreach($items as $item): 
				// print_r($item);
				$media = $IC->sliceMedia($item); ?>
			<li class="item person vcard id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">

				<h3 itemprop="name" class="fn name"><?= $item["name"] ?></h3>
				<ul class="info">
					<li itemprop="affiliation" class="affiliation">parentNode</li>
					<li itemprop="jobTitle" class="title"><?= $item["job_title"] ?></li>
					<li itemprop="telephone" class="tel" content="<?= $item["tel"] ?>"><?= $item["tel"] ?></li>
					<li><a href="mailto:<?= $item["email"] ?>" itemprop="email" class="email" content="<?= $item["email"] ?>"><?= $item["email"] ?></a></li>
				</ul>
				<? if($item["html"]): ?>
				<div class="description" itemprop="description">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>
				<? if($item["job_title"]): ?>
				<div class="job_title" itemprop="job_title">
					<dl>
						<dt>Job title</dt>
						<dl><?= $item["job_title"] ?></dl>
					</dl>	
				</div>
				<div class="email" itemprop="email">
					<dl>
						<dt>Email</dt>
						<dl><?= $item["email"] ?></dl>
					</dl>	
				</div>
				<div class="tel" itemprop="tel">
					<dl>
						<dt>Telephone</dt>
						<dl><?= $item["tel"] ?></dl>
					</dl>	
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>
	</div>
<? endif; ?>

	<div itemtype="http://schema.org/Organization" itemscope class="vcard company">
		<h2 class="name fn org" itemprop="name">parentNode Aps</h2>

		<dl class="info basic">
			<dt class="location">Address</dt>
			<dd class="location" itemprop="location" itemscope itemtype="http://schema.org/Place">
				<ul class="address" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
					<li class="streetaddress" itemprop="streetAddress">Æbeløgade 4</li>
					<li class="city"><span class="postal" itemprop="postalCode">2100</span> <span class="locality" itemprop="addressLocality">København Ø</span></li>
					<li class="country" itemprop="addressCountry">Denmark</li>
				</ul>
				<ul class="geo" itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
					<li class="latitude" itemprop="latitude" content="55.711510"></li>
					<li class="longitude" itemprop="longitude" content="12.564495"></li>
				</ul>
			</dd>
			<dt class="cvr">CVR</dt>
			<dd class="cvr" itemprop="taxID">39 75 76 13</dd>
		</dl>

		<dl class="info contact">
			<dt class="contact">Contact</dt>
			<dd class="contact">
				<ul>
					<li class="email"><a href="mailto:info@parentnode.dk" itemprop="email" content="info@parentnode.dk">info@parentnode.dk</a></li>
					<li itemprop="telephone" class="tel" content="+4520742819">+45 2074 2819</li>
				</ul>
			</dd>
			<dt class="social">Social media</dt>
			<dd class="social">
				<ul>
					<li class="facebook"><a href="https://facebook.com/parentnode" target="_blank">Facebook</a></li>
					<li class="linkedin"><a href="https://www.linkedin.com/company/parentnode" target="_blank">LinkedIn</a></li>
					<li class="meetup"><a href="https://www.meetup.com/parentNode-copenhagen	" target="_blank">Meetup</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="info financial">
			<dt class="bank">Bank</dt>
			<dd class="bank"><a href="http://faelleskassen.dk" target="_blank">Fælleskassen</a></dd>

			<dt class="account">Account no</dt>
			<dd class="account">8411 4145172</dd>

			<dt class="account">IBAN</dt>
			<dd class="account">DK3184110004145172</dd>

			<dt class="account">SWIFT/BIC</dt>
			<dd class="account">FAELDKK1</dd>
		</dl>

	</div>



</div>
