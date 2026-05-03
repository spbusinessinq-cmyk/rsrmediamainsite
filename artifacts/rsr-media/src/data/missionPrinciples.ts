export interface Principle {
  title: string;
  desc: string;
}

export const CORE_PRINCIPLES: Principle[] = [
  { title: "Truth over speed", desc: "We wait until we have it right before we publish." },
  { title: "People over parties", desc: "No party line. No tribal allegiance. People first." },
  { title: "Evidence over rumor", desc: "Claims require documentation or multi-source verification." },
  { title: "Community over clout", desc: "We serve the community, not the algorithm or the influencer economy." },
  { title: "Corrections over ego", desc: "When we get it wrong, we fix it publicly and without spin." },
  { title: "Open debate without mob rule", desc: "We believe in discourse. We do not believe in pile-ons." },
];

export const WILL_DO: Principle[] = [
  { title: "Verify before amplifying", desc: "We confirm facts from at least one independent source before publishing claims." },
  { title: "Separate facts from opinion", desc: "Analysis and editorial opinion are clearly labeled. Reporting is not commentary." },
  { title: "Give the audience source context", desc: "We tell you where information comes from and how to evaluate it." },
  { title: "Cover ignored community concerns", desc: "Stories that get overlooked by larger outlets deserve disciplined coverage." },
  { title: "Correct errors transparently", desc: "When we get something wrong, we say so clearly and fix it publicly." },
  { title: "Protect good-faith sources", desc: "Sources who come to us in good faith are protected to the extent we are able." },
];

export const WONT_DO: Principle[] = [
  { title: "Publish unverified claims", desc: "Rumors and allegations are not treated as facts regardless of their origin." },
  { title: "Use anonymous claims without context", desc: "Anonymous sources are explained — who they are, why they're anonymous, why we trust them." },
  { title: "Carry paid political content", desc: "No paid placement. No sponsored news. No talking points disguised as reporting." },
  { title: "Use rage bait for engagement", desc: "Outrage is not our product. Signal is." },
  { title: "Pretend speculation is fact", desc: "If something is uncertain, we say so. Certainty we don't have is not manufactured." },
];
