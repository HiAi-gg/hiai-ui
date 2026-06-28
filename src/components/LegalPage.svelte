<!-- LegalPage.svelte — Single-page legal document (privacy / terms / cookies) -->
<!-- Renders structured LegalContentModel when provided, otherwise falls back to -->
<!-- hardcoded EN templates. Both paths interpolate {siteName} / {contactEmail}. -->

<script module lang="ts">
	import type { LegalSection as SectionT } from "../lib/legal-types.js";

	// Privacy fallback — GDPR-style notice with {siteName} / {contactEmail}.
	const PRIVACY_FALLBACK: SectionT = {
		title: "Privacy Policy",
		intro:
			'{siteName} ("we", "us", or "our") operates this website and the related services made available through it. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit, register on, or otherwise interact with {siteName}. Please read this policy carefully. If you do not agree with its terms, please discontinue use of the site.',
		blocks: [
			{
				heading: "1. Information We Collect",
				body:
					"We may collect personal information that you voluntarily provide to us, including but not limited to your name, email address, postal address, phone number, and any other details you choose to share when filling out forms, creating an account, or contacting us. We also automatically collect certain technical information when you visit {siteName}, including your IP address, browser type and version, operating system, referring URLs, device identifiers, and information about how you interact with the service.",
			},
			{
				heading: "2. How We Use Your Information",
				body:
					"We use the information we collect for various purposes, including to: provide, operate, and maintain {siteName}; improve, personalize, and expand our services; process your transactions; communicate with you about updates, security alerts, and support messages; detect and prevent fraud or abuse; and comply with our legal obligations.",
			},
			{
				heading: "3. Legal Basis for Processing (GDPR)",
				body:
					"If you are located in the European Economic Area, the United Kingdom, or Switzerland, our legal basis for collecting and processing your personal information depends on the context. We typically rely on one or more of the following: your consent; the need to perform a contract with you; our legitimate interests (which are not overridden by your data protection rights); or compliance with a legal obligation.",
			},
			{
				heading: "4. Cookies and Similar Technologies",
				body:
					"{siteName} uses cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. For more details, please review our Cookie Policy.",
			},
			{
				heading: "5. Data Sharing and Disclosure",
				body:
					"We do not sell your personal information. We may share information with service providers who perform services on our behalf, with affiliates and business partners, when required by law or in response to valid legal process, in connection with a corporate transaction, or with your consent. We require all third parties to respect the security of your personal data and to treat it in accordance with applicable law.",
			},
			{
				heading: "6. Data Retention and Your Rights",
				body:
					"We will retain your personal data only as long as necessary to fulfill the purposes for which we collected it, including to satisfy any legal, accounting, or reporting requirements. You have the right to access, correct, delete, or restrict the processing of your personal information. You may also have the right to data portability and to object to processing carried out on the basis of our legitimate interests.",
			},
			{
				heading: "7. Security",
				body:
					"We use commercially reasonable safeguards designed to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security of your data.",
			},
		],
		contactEmail: true,
		contactTitle: "Contact Us",
		contactText:
			"If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us at:",
	};

	// Terms of Service fallback — standard SaaS terms with placeholders.
	const TERMS_FALLBACK: SectionT = {
		title: "Terms of Service",
		intro:
			"Welcome to {siteName}. These Terms of Service (\"Terms\") govern your access to and use of {siteName}, including any content, functionality, and services offered on or through it. By accessing or using {siteName}, you agree to be bound by these Terms. If you do not agree, you must not access or use the service.",
		blocks: [
			{
				heading: "1. Acceptance of Terms",
				body:
					"By accessing or using {siteName}, you confirm that you accept these Terms and agree to comply with them. If you do not agree, you must not access or use {siteName}.",
			},
			{
				heading: "2. Changes to These Terms",
				body:
					"We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when posted and apply to all access to and use of {siteName} thereafter. Your continued use of {siteName} following the posting of revised Terms means that you accept and agree to the changes.",
			},
			{
				heading: "3. Account Registration and Security",
				body:
					"To access certain features of {siteName}, you may be required to register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for safeguarding your password and for all activities that occur under your account, whether or not you authorized them.",
			},
			{
				heading: "4. Acceptable Use",
				body:
					"You agree to use {siteName} only for lawful purposes and in accordance with these Terms. You agree not to use the service in any way that violates applicable law or regulation, that attempts to damage, disable, overburden, or impair the site, or that interferes with any other party's use of the service.",
			},
			{
				heading: "5. Intellectual Property Rights",
				body:
					"{siteName} and its entire contents, features, and functionality — including but not limited to text, graphics, logos, icons, images, audio clips, and software — are the exclusive property of {siteName}, its licensors, or other providers of such material and are protected by copyright, trademark, and other intellectual property laws.",
			},
			{
				heading: "6. Limitation of Liability",
				body:
					"To the fullest extent permitted by law, {siteName}, its affiliates, and their respective officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, {siteName}.",
			},
			{
				heading: "7. Termination",
				body:
					"We may terminate or suspend your account and access to {siteName} at any time, without prior notice, for conduct that we believe violates these Terms or is otherwise harmful to other users of the service, us, or third parties. You may also discontinue use of the service at any time.",
			},
		],
		contactEmail: true,
		contactTitle: "Questions About These Terms",
		contactText:
			"If you have any questions about these Terms of Service, please contact us at:",
	};

	// Cookie Policy fallback — describes categories of cookies used.
	const COOKIES_FALLBACK: SectionT = {
		title: "Cookie Policy",
		intro:
			"This Cookie Policy explains how {siteName} (\"we\", \"us\", or \"our\") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control their use.",
		blocks: [
			{
				heading: "1. What Are Cookies",
				body:
					"Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information to the site owners.",
			},
			{
				heading: "2. Why We Use Cookies",
				body:
					"{siteName} uses first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as \"essential\" or \"strictly necessary\" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our site.",
			},
			{
				heading: "3. Categories of Cookies We Use",
				body: "We categorize the cookies we use as follows:",
				bullets: [
					"Strictly necessary cookies — required for the operation of {siteName}.",
					"Performance and analytics cookies — collect aggregated information about how visitors use the site so we can measure and improve performance.",
					"Functionality cookies — remember choices you make (such as your preferred language) and provide enhanced, personalized features.",
					"Targeting and advertising cookies — record your visit, the pages you visit, and the links you follow, so we can deliver more relevant advertising.",
				],
			},
			{
				heading: "4. Third-Party Cookies",
				body:
					"In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so forth. These third parties may use cookies to gather information about your online activities across different websites and services over time.",
			},
			{
				heading: "5. How to Manage Cookies",
				body:
					"Most browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent. Please note that if you disable or refuse cookies, some parts of {siteName} may become inaccessible or not function properly.",
			},
			{
				heading: "6. Updates to This Policy",
				body:
					"We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Please revisit this page periodically to stay informed about our use of cookies and related technologies.",
			},
		],
		contactEmail: true,
		contactTitle: "Contact Us",
		contactText:
			"If you have any questions about our use of cookies or this Cookie Policy, please contact us at:",
	};
</script>

<script lang="ts">
	import { cn } from "../lib/utils.js";
	import type {
		LegalContentModel,
		LegalPageType,
		LegalSection,
	} from "../lib/legal-types.js";

	interface Props {
		appName: string;
		contactEmail: string;
		pageType: LegalPageType;
		effectiveDate?: string;
		legalContent?: LegalContentModel | null;
		class?: string;
	}

	const {
		appName,
		contactEmail,
		pageType,
		effectiveDate,
		legalContent,
		class: className,
	}: Props = $props();

	// Minimal XSS sanitizer — escapes characters that could form HTML / script tags.
	// Applied to every user-provided string before it is rendered via {@html}.
	function sanitizeHtml(str: string): string {
		if (str === undefined || str === null) return "";
		return String(str)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	// Interpolate {siteName} → appName and {contactEmail} → contactEmail.
	//
	// The user's input text is HTML-escaped first (defense against XSS via
	// fields like block.heading / block.body / block.lead / bullets[]). Then
	// the prop values (already escaped) are substituted in for the placeholder
	// tokens. Result: every dynamic string in `renderedContent` is safe to
	// embed inside our hardcoded structural tags.
	function interpolate(str: string): string {
		if (!str) return "";
		const safeName = sanitizeHtml(appName);
		const safeEmail = sanitizeHtml(contactEmail);
		return sanitizeHtml(str)
			.replace(/\{siteName\}/g, safeName)
			.replace(/\{contactEmail\}/g, safeEmail);
	}

	function defaultTitle(type: LegalPageType): string {
		switch (type) {
			case "privacy":
				return "Privacy Policy";
			case "terms":
				return "Terms of Service";
			case "cookies":
				return "Cookie Policy";
		}
	}

	function fallbackFor(type: LegalPageType): LegalSection {
		switch (type) {
			case "privacy":
				return PRIVACY_FALLBACK;
			case "terms":
				return TERMS_FALLBACK;
			case "cookies":
				return COOKIES_FALLBACK;
		}
	}

	// Choose a section: structured model first, fallback otherwise.
	const section: LegalSection = $derived(
		legalContent?.sections?.[pageType] ?? fallbackFor(pageType)
	);

	const pageTitle: string = $derived(
		interpolate(section.title ?? defaultTitle(pageType))
	);

	// Final HTML for the body content. Structural tags are hardcoded here;
	// user-provided strings have already been escaped via `interpolate` /
	// `sanitizeHtml`, so they cannot break out of their containing tags.
	const renderedContent: string = $derived.by(() => {
		const parts: string[] = [];
		if (section.intro) {
			parts.push(
				`<p class="mb-6 text-base text-muted-foreground">${interpolate(section.intro)}</p>`
			);
		}
		for (const block of section.blocks ?? []) {
			if (block.heading) {
				parts.push(
					`<h3 class="mt-8 mb-3 text-lg font-semibold text-primary">${interpolate(block.heading)}</h3>`
				);
			}
			if (block.lead) {
				parts.push(
					`<p class="mb-3 text-sm font-medium text-foreground">${interpolate(block.lead)}</p>`
				);
			}
			if (block.body) {
				parts.push(
					`<p class="mb-3 leading-relaxed text-foreground">${interpolate(block.body)}</p>`
				);
			}
			if (block.bullets?.length) {
				const items = block.bullets
					.map(
						(b) =>
							`<li class="leading-relaxed text-foreground">${interpolate(b)}</li>`
					)
					.join("");
				parts.push(
					`<ul class="mb-4 ml-6 list-disc space-y-1 marker:text-primary">${items}</ul>`
				);
			}
		}
		if (section.contactEmail) {
			const cTitle = interpolate(section.contactTitle ?? "Contact Us");
			const cText = interpolate(
				section.contactText ??
					"If you have any questions about this policy, please contact us at:"
			);
			const safeEmail = sanitizeHtml(contactEmail);
			parts.push(
				`<div class="mt-8 rounded-2xl border border-border bg-muted p-5">` +
					`<h4 class="mb-1 text-base font-semibold text-primary">${sanitizeHtml(cTitle)}</h4>` +
					`<p class="text-sm text-foreground">${sanitizeHtml(cText)} ` +
					`<a class="font-medium text-primary underline" href="mailto:${safeEmail}">${safeEmail}</a></p>` +
					`</div>`
			);
		}
		return parts.join("\n");
	});
</script>

<article
	class={cn(
		"legal-page max-w-3xl mx-auto px-4 py-10 text-sm leading-relaxed text-foreground",
		className
	)}
>
	<header class="mb-8 border-b border-border pb-6">
		<h1 class="text-3xl font-bold tracking-tight text-primary">
			{pageTitle}
		</h1>
		{#if effectiveDate}
			<p class="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
				Effective: {effectiveDate}
			</p>
		{/if}
	</header>

	<!-- Body content: structural HTML is hardcoded by us; dynamic text has -->
	<!-- been pre-sanitized inside `interpolate` / `sanitizeHtml`. The whole -->
	<!-- `renderedContent` string is therefore already HTML-safe to inject. -->
	<div class="legal-content">
		{@html renderedContent}
	</div>
</article>
