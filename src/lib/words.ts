import { getRandom } from '$lib';

export function randomWord(): string {
	return getRandom(words).toUpperCase();
}

export const words: Array<string> = [
	'about',
	'other',
	'their',
	'first',
	'would',
	'price',
	'email',
	'world',
	'music',
	'after',
	'video',
	'links',
	'years',
	'items',
	'group',
	'under',
	'games',
	'could',
	'great',
	'hotel',
	'store',
	'terms',
	'right',
	'those',
	'using',
	'phone',
	'forum',
	'based',
	'black',
	'index',
	'being',
	'women',
	'today',
	'south',
	'pages',
	'found',
	'house',
	'power',
	'while',
	'place',
	'think',
	'north',
	'media',
	'water',
	'since',
	'guide',
	'board',
	'white',
	'times',
	'hours',
	'image',
	'money',
	'reply',
	'value',
	'learn',
	'print',
	'stock',
	'point',
	'large',
	'table',
	'model',
	'human',
	'movie',
	'march',
	'study',
	'april',
	'topic',
	'below',
	'party',
	'login',
	'above',
	'quote',
	'story',
	'rates',
	'young',
	'field',
	'girls',
	'night',
	'texas',
	'poker',
	'range',
	'court',
	'audio',
	'light',
	'write',
	'given',
	'files',
	'china',
	'might',
	'month',
	'major',
	'space',
	'cards',
	'child',
	'share',
	'radio',
	'until',
	'track',
	'least',
	'trade',
	'close',
	'drive',
	'short',
	'means',
	'daily',
	'beach',
	'style',
	'front',
	'parts',
	'early',
	'miles',
	'sound',
	'works',
	'rules',
	'final',
	'adult',
	'thing',
	'cheap',
	'third',
	'gifts',
	'cover',
	'often',
	'watch',
	'deals',
	'words',
	'linux',
	'james',
	'heart',
	'clear',
	'makes',
	'taken',
	'quick',
	'whole',
	'later',
	'basic',
	'along',
	'among',
	'death',
	'brand',
	'doing',
	'loans',
	'entry',
	'notes',
	'force',
	'album',
	'views',
	'plans',
	'build',
	'types',
	'lines',
	'asked',
	'lower',
	'names',
	'woman',
	'cable',
	'score',
	'shown',
	'flash',
	'ideas',
	'homes',
	'super',
	'cause',
	'focus',
	'voice',
	'comes',
	'brown',
	'forms',
	'smith',
	'thank',
	'sport',
	'ready',
	'round',
	'built',
	'earth',
	'nokia',
	'italy',
	'extra',
	'rated',
	'quite',
	'horse',
	'owner',
	'takes',
	'bring',
	'input',
	'agent',
	'valid',
	'grand',
	'trial',
	'units',
	'wrote',
	'metal',
	'funds',
	'guest',
	'multi',
	'grade',
	'panel',
	'match',
	'plant',
	'stage',
	'maybe',
	'spain',
	'youth',
	'break',
	'dance',
	'enjoy',
	'block',
	'fixed',
	'wrong',
	'hands',
	'paris',
	'worth',
	'coast',
	'grant',
	'blogs',
	'scale',
	'stand',
	'frame',
	'chief',
	'gives',
	'heard',
	'begin',
	'royal',
	'clean',
	'suite',
	'vegas',
	'chris',
	'older',
	'whose',
	'naked',
	'lives',
	'stone',
	'buyer',
	'waste',
	'chair',
	'phase',
	'shirt',
	'crime',
	'count',
	'claim',
	'patch',
	'alone',
	'jones',
	'saint',
	'drugs',
	'joint',
	'fresh',
	'dates',
	'prime',
	'began',
	'louis',
	'urban',
	'tours',
	'labor',
	'admin',
	'heavy',
	'solid',
	'touch',
	'goals',
	'magic',
	'mount',
	'smart',
	'latin',
	'avoid',
	'birth',
	'virus',
	'abuse',
	'facts',
	'faith',
	'chain',
	'moved',
	'reach',
	'films',
	'owned',
	'draft',
	'chart',
	'clubs',
	'equal',
	'codes',
	'kinds',
	'teams',
	'tried',
	'named',
	'laser',
	'taxes',
	'mouse',
	'brain',
	'dream',
	'false',
	'clips',
	'brief',
	'eight',
	'wants',
	'alert',
	'diego',
	'truck',
	'votes',
	'ocean',
	'depth',
	'train',
	'route',
	'frank',
	'anime',
	'speak',
	'query',
	'judge',
	'bytes',
	'fight',
	'filed',
	'korea',
	'banks',
	'leads',
	'brian',
	'wales',
	'minor',
	'noted',
	'spent',
	'davis',
	'helps',
	'drink',
	'intel',
	'rings',
	'henry',
	'delta',
	'bonus',
	'adobe',
	'layer',
	'spend',
	'ratio',
	'empty',
	'maine',
	'ideal',
	'parks',
	'cream',
	'boxes',
	'shape',
	'firms',
	'usage',
	'mixed',
	'exist',
	'angel',
	'width',
	'noise',
	'sharp',
	'knows',
	'kevin',
	'plate',
	'logic',
	'plain',
	'costa',
	'trail',
	'setup',
	'blues',
	'scope',
	'crazy',
	'bears',
	'mouth',
	'fruit',
	'mysql',
	'lewis',
	'sugar',
	'stick',
	'slide',
	'exact',
	'bound',
	'storm',
	'micro',
	'paint',
	'delay',
	'pilot',
	'novel',
	'ultra',
	'idaho',
	'plays',
	'truly',
	'lodge',
	'broad',
	'clark',
	'guard',
	'newly',
	'raise',
	'bands',
	'lunch',
	'audit',
	'tower',
	'yours',
	'jason',
	'solar',
	'doubt',
	'const',
	'forth',
	'bruce',
	'split',
	'twice',
	'egypt',
	'shift',
	'simon',
	'marks',
	'loved',
	'birds',
	'saved',
	'piano',
	'ports',
	'teach',
	'rapid',
	'hairy',
	'dutch',
	'holds',
	'pulse',
	'metro',
	'strip',
	'pearl',
	'heads',
	'honda',
	'opera',
	'blank',
	'humor',
	'lived',
	'meant',
	'plane',
	'grace',
	'roman',
	'trips',
	'turns',
	'proud',
	'giant',
	'angle',
	'vinyl',
	'worst',
	'pants',
	'nurse',
	'quiet',
	'crown',
	'maker',
	'picks',
	'smoke',
	'craft',
	'blind',
	'coins',
	'epson',
	'actor',
	'finds',
	'prize',
	'dirty',
	'wayne',
	'alive',
	'prove',
	'wings',
	'ridge',
	'moves',
	'throw',
	'trend',
	'rhode',
	'worse',
	'boats',
	'fiber',
	'graph',
	'talks',
	'bonds',
	'fraud',
	'crash',
	'inter',
	'grove',
	'spray',
	'roads',
	'faces',
	'mayor',
	'yield',
	'lakes',
	'diary',
	'kings',
	'flags',
	'baker',
	'shock',
	'ebony',
	'drawn',
	'beast',
	'yards',
	'jokes',
	'globe',
	'dicke',
	'ghost',
	'pride',
	'keith',
	'linda',
	'chile',
	'quest',
	'trans',
	'acres',
	'vital',
	'modes',
	'opens',
	'lucky',
	'thick',
	'vista',
	'chips',
	'grown',
	'smile',
	'lands',
	'armed',
	'candy',
	'tiger',
	'folks',
	'icons',
	'moral',
	'pound',
	'bread',
	'tough',
	'chest',
	'craig',
	'solve',
	'tones',
	'sight',
	'towns',
	'reads',
	'roles',
	'glory',
	'saudi',
	'fault',
	'karen',
	'rugby',
	'fluid',
	'devil',
	'marie',
	'kenya',
	'sized',
	'swing',
	'poems',
	'winds',
	'gnome',
	'noble',
	'shore',
	'loves',
	'rocks',
	'ralph',
	'corps',
	'liver',
	'decor',
	'evans',
	'fails',
	'alice',
	'intro',
	'clerk',
	'jeans',
	'fonts',
	'favor',
	'sigma',
	'xhtml',
	'aside',
	'camps',
	'trace',
	'packs',
	'spoke',
	'rough',
	'weird',
	'holes',
	'blade',
	'meals',
	'robin',
	'strap',
	'crowd',
	'cloud',
	'knife',
	'shelf',
	'liked',
	'adopt',
	'outer',
	'tales',
	'islam',
	'nodes',
	'cited',
	'skype',
	'tired',
	'steam',
	'acute',
	'carol',
	'stack',
	'curve',
	'amber',
	'trunk',
	'waves',
	'camel',
	'lamps',
	'juice',
	'chase',
	'sauce',
	'beads',
	'flows',
	'proxy',
	'voted',
	'bikes',
	'gates',
	'slave',
	'lycos',
	'zdnet',
	'haven',
	'charm'
];
