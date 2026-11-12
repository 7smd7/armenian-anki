// Checks the conjugation engine against the textbook tables.
// Run: npx jiti scripts/check-grammar.ts
import { conjugate, stripMarks, type TenseId } from "../src/lib/grammar/conjugate";
import { VERBS } from "../src/lib/grammar/verbs";

const V = (inf: string) => {
    const v = VERBS.find((x) => x.inf === inf);
    if (!v) throw new Error("missing verb " + inf);
    return v;
};

// [infinitive, tense, person, negative, expected]
const CASES: [string, TenseId, number, boolean, string][] = [
    // Model verbs (reference poster)
    ["գրել", "present", 0, false, "գրում եմ"], ["գրել", "present", 0, true, "չեմ գրում"],
    ["գրել", "aorist", 0, false, "գրեցի"], ["գրել", "aorist", 0, true, "չգրեցի"],
    ["գրել", "imperfect", 0, true, "չէի գրում"], ["գրել", "perfect", 0, false, "գրել եմ"],
    ["գրել", "pluperfect", 0, true, "չէի գրել"], ["գրել", "futPlan", 0, false, "գրելու եմ"],
    ["գրել", "future", 0, false, "կգրեմ"], ["գրել", "future", 0, true, "չեմ գրի"],
    ["գրել", "future", 2, false, "կգրի"], ["գրել", "oblig", 0, true, "չպիտի գրեմ"],
    ["գրել", "futPast", 0, true, "չէի գրելու"], ["գրել", "condPast", 0, false, "կգրեի"],
    ["գրել", "condPast", 2, false, "կգրեր"], ["գրել", "condPast", 0, true, "չէի գրի"],
    ["գրել", "obligPast", 0, false, "պիտի գրեի"], ["գրել", "aorist", 2, false, "գրեց"],
    ["կարդալ", "present", 0, false, "կարդում եմ"], ["կարդալ", "aorist", 0, false, "կարդացի"],
    ["կարդալ", "aorist", 2, false, "կարդաց"], ["կարդալ", "perfect", 0, false, "կարդացել եմ"],
    ["կարդալ", "future", 0, false, "կկարդամ"], ["կարդալ", "future", 0, true, "չեմ կարդա"],
    ["կարդալ", "condPast", 0, false, "կկարդայի"], ["կարդալ", "condPast", 2, false, "կկարդար"],
    ["կարդալ", "condPast", 0, true, "չէի կարդա"], ["կարդալ", "futPlan", 0, false, "կարդալու եմ"],
    ["կարդալ", "imperative", 1, false, "կարդա"], ["կարդալ", "imperative", 4, false, "կարդացեք"],
    ["կարդալ", "imperative", 4, true, "մի կարդացեք"],
    ["հասկանալ", "aorist", 0, false, "հասկացա"], ["հասկանալ", "aorist", 2, false, "հասկացավ"],
    ["հասկանալ", "perfect", 0, false, "հասկացել եմ"], ["հասկանալ", "future", 0, false, "կհասկանամ"],
    ["հասկանալ", "future", 0, true, "չեմ հասկանա"], ["հասկանալ", "condPast", 0, false, "կհասկանայի"],
    ["հասկանալ", "imperative", 1, false, "հասկացիր"], ["հասկանալ", "imperative", 4, false, "հասկացեք"],
    ["գրել", "imperative", 1, false, "գրիր"], ["գրել", "imperative", 4, false, "գրեք"],
    ["գրել", "imperative", 1, true, "մի գրիր"],
    // Families
    ["մոտենալ", "aorist", 0, false, "մոտեցա"], ["մոտենալ", "imperative", 1, false, "մոտեցիր"],
    ["մտնել", "aorist", 0, false, "մտա"], ["մտնել", "perfect", 0, false, "մտել եմ"],
    ["մտնել", "imperative", 1, false, "մտիր"], ["մտնել", "present", 0, false, "մտնում եմ"],
    ["մտնել", "future", 0, false, "կմտնեմ"], ["մտնել", "futPlan", 0, false, "մտնելու եմ"],
    ["փախչել", "aorist", 0, false, "փախա"], ["փախչել", "imperative", 4, false, "փախեք"],
    ["կորչել", "imperative", 4, true, "մի կորեք"],
    ["հիշեցնել", "aorist", 0, false, "հիշեցրի"], ["հիշեցնել", "aorist", 2, false, "հիշեցրեց"],
    ["հիշեցնել", "aorist", 5, false, "հիշեցրին"], ["հիշեցնել", "aorist", 0, true, "չհիշեցրի"],
    ["հիշեցնել", "perfect", 0, false, "հիշեցրել եմ"], ["հիշեցնել", "imperative", 1, false, "հիշեցրու"],
    ["հիշեցնել", "imperative", 4, false, "հիշեցրեք"], ["հիշեցնել", "imperative", 1, true, "մի հիշեցրու"],
    ["հիշեցնել", "present", 0, false, "հիշեցնում եմ"], ["հիշեցնել", "future", 0, false, "կհիշեցնեմ"],
    // Irregulars (Appendix 6)
    ["գալ", "present", 0, false, "գալիս եմ"], ["գալ", "imperfect", 0, false, "գալիս էի"],
    ["գալ", "present", 0, true, "չեմ գալիս"], ["գալ", "aorist", 0, false, "եկա"],
    ["գալ", "perfect", 0, false, "եկել եմ"], ["գալ", "future", 0, false, "կգամ"],
    ["գալ", "oblig", 0, false, "պիտի գամ"], ["գալ", "futPlan", 0, false, "գալու եմ"],
    ["գալ", "imperative", 1, false, "արի"], ["գալ", "imperative", 4, false, "եկեք"],
    ["գալ", "imperative", 1, true, "մի արի"],
    ["տալ", "present", 0, false, "տալիս եմ"], ["տալ", "aorist", 0, false, "տվեցի"],
    ["տալ", "perfect", 0, false, "տվել եմ"], ["տալ", "imperative", 1, false, "տուր"],
    ["տալ", "imperative", 4, false, "տվեք"],
    ["ուտել", "present", 0, false, "ուտում եմ"], ["ուտել", "aorist", 0, false, "կերա"],
    ["ուտել", "perfect", 0, false, "կերել եմ"], ["ուտել", "future", 0, false, "կուտեմ"],
    ["ուտել", "imperative", 1, false, "կեր"], ["ուտել", "imperative", 4, false, "կերեք"],
    ["տանել", "aorist", 0, false, "տարա"], ["տանել", "imperative", 1, false, "տար"],
    ["լինել", "aorist", 0, false, "եղա"], ["լինել", "perfect", 0, false, "եղել եմ"],
    ["լինել", "future", 0, false, "կլինեմ"], ["լինել", "future", 2, false, "կլինի"],
    ["լինել", "imperative", 1, false, "եղիր"],
    ["դառնալ", "aorist", 0, false, "դարձա"], ["դառնալ", "present", 0, false, "դառնում եմ"],
    ["դառնալ", "perfect", 0, false, "դարձել եմ"], ["դառնալ", "imperative", 1, false, "դարձիր"],
    ["վերադառնալ", "aorist", 0, false, "վերադարձա"],
    ["դնել", "aorist", 0, false, "դրեցի"], ["դնել", "perfect", 0, false, "դրել եմ"],
    ["դնել", "imperative", 1, false, "դիր"], ["դնել", "imperative", 4, false, "դրեք"],
    ["անել", "aorist", 0, false, "արեցի"], ["անել", "perfect", 0, false, "արել եմ"],
    ["անել", "future", 0, false, "կանեմ"], ["անել", "imperative", 1, false, "արա"],
    ["թողնել", "aorist", 0, false, "թողեցի"], ["թողնել", "perfect", 0, false, "թողել եմ"],
    ["թողնել", "imperative", 1, false, "թող"],
    ["լվանալ", "aorist", 0, false, "լվացի"], ["լվանալ", "perfect", 0, false, "լվացել եմ"],
    ["լվանալ", "imperative", 1, false, "լվա"], ["լվանալ", "imperative", 4, false, "լվացեք"],
    ["ասել", "aorist", 0, false, "ասացի"], ["ասել", "perfect", 0, false, "ասել եմ"],
    ["ասել", "future", 0, false, "կասեմ"], ["ասել", "imperative", 1, false, "ասա"],
    ["ասել", "imperative", 4, false, "ասեք"],
    ["բերել", "imperative", 1, false, "բեր"], ["բերել", "aorist", 0, false, "բերեցի"],
    ["առնել", "aorist", 0, false, "առա"], ["առնել", "imperative", 1, false, "առ"],
    ["տեսնել", "aorist", 0, false, "տեսա"], ["տեսնել", "imperative", 1, false, "տես"],
    ["ունենալ", "aorist", 0, false, "ունեցա"], ["ունենալ", "future", 0, false, "կունենամ"],
    ["իմանալ", "aorist", 0, false, "իմացա"], ["կարողանալ", "future", 0, false, "կկարողանամ"],
];

let fail = 0;
for (const [inf, tense, p, neg, expected] of CASES) {
    const f = conjugate(V(inf), tense, p, neg);
    if (stripMarks(f.text) !== expected) {
        fail++;
        console.log(`✗ ${inf} ${tense} p${p}${neg ? " neg" : ""}: got ${f.text}, want ${expected}`);
    }
}

// Every verb × tense × person must produce a non-empty form and an English gloss
let total = 0;
for (const v of VERBS)
    for (const t of ["present","imperfect","aorist","perfect","pluperfect","futPlan","futPast","future","condPast","oblig","obligPast","imperative"] as TenseId[])
        for (const p of t === "imperative" ? [1, 4] : [0,1,2,3,4,5])
            for (const n of [false, true]) {
                const f = conjugate(v, t, p, n);
                total++;
                if (!f.text || !f.english || /undefined/.test(f.text + f.english)) {
                    fail++;
                    console.log("✗ empty", v.inf, t, p, n, f);
                }
            }

// A few English glosses
const g = (inf: string, t: TenseId, p: number, n = false) => conjugate(V(inf), t, p, n).english;
console.log(g("գրել","perfect",2), "|", g("բարկանալ","aorist",0,true), "|", g("վախենալ","present",0), "|", g("վախենալ","imperfect",2,true), "|", g("արթնացնել","imperative",4,true), "|", g("ամուսնանալ","imperfect",5));

// ── Spaced repetition ──
import { pickNext, reviewCard, previewInterval, type SrsStates } from "../src/lib/grammar/srs";
import { verbCardKeys, topicCardKeys, isValidCardKey, TOTAL_CARDS } from "../src/lib/grammar/cards";

const expect = (label: string, ok: boolean) => {
    if (!ok) { fail++; console.log("✗ srs:", label); }
};
const keys = verbCardKeys(["present", "aorist"], ["el", "al"]);
expect("first new card is գրել present", keys[0] === "v:գրել:present");
expect("keys valid", keys.every(isValidCardKey) && topicCardKeys("pronouns").every(isValidCardKey));
expect("unknown key rejected", !isValidCardKey("v:foo:present"));

const t0 = new Date("2026-11-12T10:00:00Z");
let st: SrsStates = {};
// No cap: new cards keep coming while nothing is due (20 in a row here)
for (let i = 0; i < 20; i++) {
    const n = pickNext(keys, st, t0)!;
    expect(`new card ${i} not blocked`, n.bucket === "new");
    st[n.key] = reviewCard(st[n.key], 2, t0); // Good → learning step (1 min)
}
// When every card has been seen and none is due, learning cards are shown early
const seenAll = Object.fromEntries(keys.map((k) => [k, reviewCard(undefined, 2, t0)]));
expect("never blocked when all cards seen", pickNext(keys, seenAll, t0)!.bucket === "learningLater");
// One minute later the first card is due again
const t1 = new Date(t0.getTime() + 61_000);
const n3 = pickNext(keys, st, t1)!;
expect("learning card due after 1 min", n3.bucket === "learning");
expect("Again previews 1m", previewInterval(st[n3.key], 0, t1) === "1m");
// Easy graduates to days
const grad = reviewCard(st[n3.key], 3, t1);
expect("Easy graduates to ≥1 day", grad.interval >= 1 && grad.repetitions === 1);
// Next day the graduated card is a review
st = { ...st, [n3.key]: grad };
const tomorrow = new Date(new Date(grad.dueAt).getTime() + 1000);
const reviewDue = Object.entries(st).filter(([, s]) => s.repetitions > 0);
expect("graduated card exists", reviewDue.length === 1);
const n4 = pickNext([n3.key], st, tomorrow)!;
expect("graduated card comes back as review", n4.bucket === "review");

console.log(`${CASES.length} textbook checks, ${total} generated forms, ${TOTAL_CARDS} SRS cards, ${fail} failures`);
process.exit(fail ? 1 : 0);
