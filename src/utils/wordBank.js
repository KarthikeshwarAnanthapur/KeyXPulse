const WORDS = [
  'apple','brave','cloud','dance','earth','flame','grace','happy','ivory','juice',
  'karma','light','magic','noble','ocean','piano','quiet','river','smile','table',
  'ultra','vivid','water','xenon','yield','zebra','array','blend','crisp','drift',
  'eager','forte','glint','haste','index','joust','knack','lemon','maple','nicer',
  'oxide','pearl','quest','relay','stern','token','umbra','vault','wrist','young',
  'angle','brush','candy','depot','elder','fresh','grand','holly','input','jewel',
  'knock','lance','minor','north','opera','phase','quill','rough','spark','tiger',
  'under','verse','witch','extra','yacht','zesty','agile','blink','chase','dwarf',
  'every','frost','glass','humor','image','joint','kinky','lunar','metal','nerve',
  'olive','pixel','rapid','solar','unity','waltz','alarm','beach','count','digit',
  'event','focus','greet','heart','ideal','labor','money','night','order','place',
  'queen','reach','stone','teach','upper','video','where','acute','boost','carry',
  'delta','empty','globe','house','judge','knife','limit','model','novel','other',
  'plant','query','raise','skill','title','value','write','apart','below','close',
  'depth','frame','great','hands','inner','keeps','layer','might','newer','opens',
  'print','reads','smart','taken','users','views','while','along','brand','curve',
  'drawn','eight','fifth','given','heavy','ideas','makes','named','plain','rider',
  'since','those','viola','weeks','basic','check','doing','early','feels','going',
  'helps','items','learn','moved','needs','press','think','works','swift','proud',
  'tower','storm','dream','field','world','clean','power','space','shape','place',
  'trail','coast','sound','light','shore','flame','blend','crisp','spark','focus',
];

export function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export function generateText(wordCount = 80) {
  return Array.from({ length: wordCount }, getRandomWord).join(' ');
}
