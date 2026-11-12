// Biology 2201 labelling conversions (tranche 2, Nov 12, 2026).
// The course's 13 labelling activities are 7 unique diagrams: six Drag
// and Drop diagrams each exist twice (a standalone activity and an
// identical copy inside a Unit 3 review book, same background image and
// zone layout), plus the standalone Endocrine System Image Hotspots.
// One entry per unique diagram, built from the in-book copy where the
// pair differs. In each figure the activity's own labels are replaced
// by numbered badges placed on the diagram's leader lines or on the
// structures themselves; badge placement was calibrated against the
// source zone geometry and verified on rendered composites. Each
// variant asks about one number; its three distractors are drawn fresh
// from the same diagram's other labels on every call.
// Labels are the activities' own, with three normalizations recorded
// in labels/label-spec.json: "Superior v.c." expanded to the zone's own
// name "Superior vena cava", the misspelling "Hyerpolarization"
// corrected, and "Gonads- Overies" corrected to "Gonads - Ovaries".
// Two source defects were worked around, not replicated: the digestive
// activity's drop zones do not land on its organs, and the endocrine
// thymus hotspot sits on the figure's shoulder; both diagrams' badges
// are hand-placed on the structures. The nephron's Afferent Arteriole
// zone names no correct element in either source copy; its label is
// the zone's own name, the only unmatched draggable in the activity.

function lbDraw(prompt, correct, solution, pool, fig) {
  var others = pool.filter(function (x) { return x !== correct; });
  for (var i = others.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = others[i]; others[i] = others[j]; others[j] = t;
  }
  var q = mcq(prompt, correct, others.slice(0, 3), solution, {});
  q.figure = fig;
  return q;
}


/* ---------- Heart (7.8, 7.9) ---------- */
var LB_HEART = ["Aorta","Superior vena cava","Right atrium","Tricuspid valve","Pulmonary valve","Right ventricle","Septum","Pulmonary artery","Pulmonary vein","Left atrium","Mitral valve","Aortic valve","Left ventricle"];
var FIG_HEART = '<img src="banks/bio-2201/assets/label-heart.png" alt="Diagram of the human heart with its labels replaced by the numbers 1 to 13" style="max-width:100%;height:auto">';
E("bio-lb-heart",3,["7.8","7.9"],1,"var",varset([
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 1?","Aorta","Position 1 is the Aorta: the large artery arching over the top of the heart, carrying blood to the body.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 2?","Superior vena cava","Position 2 is the Superior vena cava: the large blue vein entering the top of the right atrium, returning blood from the upper body.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 3?","Right atrium","Position 3 is the Right atrium: the upper chamber on the left side of the diagram (the heart's right side), which receives blood from the vena cavae.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 4?","Tricuspid valve","Position 4 is the Tricuspid valve: the valve between the right atrium and the right ventricle.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 5?","Pulmonary valve","Position 5 is the Pulmonary valve: the valve at the base of the pulmonary artery, where blood leaves the right ventricle.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 6?","Right ventricle","Position 6 is the Right ventricle: the lower chamber on the left side of the diagram, which pumps blood to the lungs.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 7?","Septum","Position 7 is the Septum: the muscular wall separating the left and right sides of the heart, marked at its lower end.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 8?","Pulmonary artery","Position 8 is the Pulmonary artery: the vessel carrying blood from the right ventricle to the lungs, at the top right of the diagram.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 9?","Pulmonary vein","Position 9 is the Pulmonary vein: one of the veins returning oxygenated blood from the lungs to the left atrium.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 10?","Left atrium","Position 10 is the Left atrium: the upper chamber on the right side of the diagram (the heart's left side), which receives blood from the pulmonary veins.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 11?","Mitral valve","Position 11 is the Mitral valve: the valve between the left atrium and the left ventricle.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 12?","Aortic valve","Position 12 is the Aortic valve: the valve at the base of the aorta, where blood leaves the left ventricle.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 13?","Left ventricle","Position 13 is the Left ventricle: the thick-walled lower chamber on the right side of the diagram, which pumps blood into the aorta.",LB_HEART,FIG_HEART); },
]),["Follow each dotted leader line from the number to the part of the heart it touches."]);

/* ---------- Respiratory system (7.11) ---------- */
var LB_RESP = ["Nasal Cavity","Nostril","Oral Cavity","Larynx","Right Bronchus","Right Lung","Pharynx","Trachea","Left Bronchus","Left Lung","Diaphragm"];
var FIG_RESP = '<img src="banks/bio-2201/assets/label-resp.png" alt="Diagram of the human respiratory system with its labels replaced by the numbers 1 to 11" style="max-width:100%;height:auto">';
E("bio-lb-resp",3,["7.11"],1,"var",varset([
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 1?","Nasal Cavity","Position 1 is the Nasal Cavity: the space inside the nose, at the top of the uppermost leader line on the left.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 2?","Nostril","Position 2 is the Nostril: the opening of the nose, on the second leader line on the left.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 3?","Oral Cavity","Position 3 is the Oral Cavity: the mouth, on the third leader line on the left.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 4?","Larynx","Position 4 is the Larynx: the voice box at the top of the trachea, on the lowest of the left-hand lines in the neck.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 5?","Right Bronchus","Position 5 is the Right Bronchus: the branch of the trachea entering the right lung (on the left of the diagram), at the left end of the long line crossing the chest.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 6?","Right Lung","Position 6 is the Right Lung: the lung on the left of the diagram (the person's right lung, shown behind the ribs).",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 7?","Pharynx","Position 7 is the Pharynx: the throat passage behind the nasal and oral cavities, on the uppermost leader line on the right.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 8?","Trachea","Position 8 is the Trachea: the windpipe, the ringed tube running down the centre of the neck and chest.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 9?","Left Bronchus","Position 9 is the Left Bronchus: the branch of the trachea entering the left lung (on the right of the diagram), at the right end of the long line crossing the chest.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 10?","Left Lung","Position 10 is the Left Lung: the lung on the right of the diagram (the person's left lung).",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 11?","Diaphragm","Position 11 is the Diaphragm: the sheet of muscle under the lungs, at the bottom of the lowest leader line on the right.",LB_RESP,FIG_RESP); },
]),["Follow the leader line from the number to the airway or lung it points to."]);

/* ---------- Digestive system (7.12, 7.13) ---------- */
var LB_DIG = ["Mouth","Esophagus","Stomach","Large intestine","Small intestine","Rectum"];
var FIG_DIG = '<img src="banks/bio-2201/assets/label-dig.png" alt="Diagram of the human digestive system with its labels replaced by the numbers 1 to 6" style="max-width:100%;height:auto">';
E("bio-lb-dig",3,["7.12","7.13"],1,"var",varset([
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 1?","Mouth","Position 1 is the Mouth: where digestion begins, at the head of the figure.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 2?","Esophagus","Position 2 is the Esophagus: the tube carrying food from the mouth down through the chest to the stomach.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 3?","Stomach","Position 3 is the Stomach: the muscular sac under the liver that churns food with acid and enzymes.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 4?","Large intestine","Position 4 is the Large intestine: the wider tube framing the small intestine, which absorbs water from the remains.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 5?","Small intestine","Position 5 is the Small intestine: the long, coiled tube in the centre of the abdomen where most digestion and absorption happen.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 6?","Rectum","Position 6 is the Rectum: the final straight section of the large intestine, at the bottom of the figure.",LB_DIG,FIG_DIG); },
]),["The numbers sit on the organs themselves, in the order food passes through them."]);

/* ---------- Nephron (7.14) ---------- */
var LB_NEPHRON = ["PCT","DCT","Glomerulus","Renal Corpuscle","Glomerular Capsule","Afferent Arteriole","Efferent Arteriole","Loop of Henle","Collecting Duct"];
var FIG_NEPHRON = '<img src="banks/bio-2201/assets/label-nephron.png" alt="Diagram of a nephron with its labels replaced by the numbers 1 to 9" style="max-width:100%;height:auto">';
E("bio-lb-nephron",3,["7.14"],1,"var",varset([
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 1?","PCT","Position 1 is the PCT: the proximal convoluted tubule, the coiled section leaving the glomerular capsule at the upper left.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 2?","DCT","Position 2 is the DCT: the distal convoluted tubule, the coiled section at the top centre, passing beside the glomerulus.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 3?","Glomerulus","Position 3 is the Glomerulus: the ball of capillaries (shown in red) where blood is filtered.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 4?","Renal Corpuscle","Position 4 is the Renal Corpuscle: the glomerulus together with its capsule, the filtering unit at the top right.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 5?","Glomerular Capsule","Position 5 is the Glomerular Capsule: the cup surrounding the glomerulus, which collects the filtrate (also called Bowman's capsule).",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 6?","Afferent Arteriole","Position 6 is the Afferent Arteriole: the arteriole bringing blood into the glomerulus, on the left of the red vessels.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 7?","Efferent Arteriole","Position 7 is the Efferent Arteriole: the arteriole carrying blood away from the glomerulus, below the afferent arteriole.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 8?","Loop of Henle","Position 8 is the Loop of Henle: the long U-shaped loop of the tubule, marked beside its descending and ascending limbs.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 9?","Collecting Duct","Position 9 is the Collecting Duct: the duct on the right that receives urine from the tubule and carries it toward the renal pelvis.",LB_NEPHRON,FIG_NEPHRON); },
]),["Follow the tubule: filtrate flows from the glomerulus through the capsule, the proximal tubule, the loop, the distal tubule and into the collecting duct."]);

/* ---------- Neuron (7.4) ---------- */
var LB_NEURON = ["Myelin","Node of Ranvier","Synapse","Cell body (Soma)","Dendrites","Axon","Axon terminal"];
var FIG_NEURON = '<img src="banks/bio-2201/assets/label-neuron.png" alt="Diagram of two neurons meeting at a synapse, with the labels replaced by the numbers 1 to 7" style="max-width:100%;height:auto">';
E("bio-lb-neuron",3,["7.4"],1,"var",varset([
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 1?","Myelin","Position 1 is the Myelin: the insulating sheath (shown in blue) wrapped around the upper neuron's axon.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 2?","Node of Ranvier","Position 2 is the Node of Ranvier: one of the gaps in the myelin sheath along the upper axon.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 3?","Synapse","Position 3 is the Synapse: the junction where the upper neuron's axon terminals meet the lower neuron's dendrites.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 4?","Cell body (Soma)","Position 4 is the Cell body (Soma): the large orange body of the lower neuron, containing its nucleus.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 5?","Dendrites","Position 5 is the Dendrites: the branching fibres carrying signals toward the lower neuron's cell body.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 6?","Axon","Position 6 is the Axon: the long orange fibre carrying the signal away from the lower neuron's cell body.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 7?","Axon terminal","Position 7 is the Axon terminal: the branching end of the lower neuron's axon, which passes the signal on.",LB_NEURON,FIG_NEURON); },
]),["The diagram shows two neurons meeting at a synapse; follow each leader line to the part it touches."]);

/* ---------- Action potential (7.4) ---------- */
var LB_ACTION = ["Resting potential","Threshold of excitation","Peak action potential","Repolarization","Hyperpolarization"];
var FIG_ACTION = '<img src="banks/bio-2201/assets/label-action.png" alt="Graph of an action potential (membrane potential in millivolts against time) with its stage labels replaced by the numbers 1 to 5" style="max-width:100%;height:auto">';
E("bio-lb-action",3,["7.4"],2,"var",varset([
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 1?","Resting potential","Position 1 is the Resting potential: the flat section at -70 mV before the stimulus, where the membrane is at rest.",LB_ACTION,FIG_ACTION); },
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 2?","Threshold of excitation","Position 2 is the Threshold of excitation: the point at -55 mV (the dashed line) where the rising curve crosses threshold and the action potential fires.",LB_ACTION,FIG_ACTION); },
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 3?","Peak action potential","Position 3 is the Peak action potential: the top of the spike, where the membrane potential reaches about +30 mV.",LB_ACTION,FIG_ACTION); },
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 4?","Repolarization","Position 4 is the Repolarization: the falling section of the curve, where the membrane potential drops back toward resting.",LB_ACTION,FIG_ACTION); },
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 5?","Hyperpolarization","Position 5 is the Hyperpolarization: the dip below -70 mV after the spike, before the potential settles back to resting.",LB_ACTION,FIG_ACTION); },
]),["Read the curve left to right: it starts at resting potential, fires, and then recovers."]);

/* ---------- Endocrine system (7.7) ---------- */
var LB_ENDO = ["Pineal Gland","Pituitary Gland","Thyroid Gland","Parathyroid Glands","Thymus","Adrenal Glands","Pancreas","Gonads - Ovaries","Gonads - Testes"];
var FIG_ENDO = '<img src="banks/bio-2201/assets/label-endo.png" alt="Diagram of the human endocrine system in a female (left) and a male (right) figure, with enlarged views of the brain and thyroid glands; the labels are replaced by the numbers 1 to 9" style="max-width:100%;height:auto">';
E("bio-lb-endo",3,["7.7"],1,"var",varset([
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 1?","Pineal Gland","Position 1 is the Pineal Gland: the small gland deep in the brain, shown in the enlarged brain view at the top.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 2?","Pituitary Gland","Position 2 is the Pituitary Gland: the small gland hanging below the brain, shown in the enlarged brain view at the top.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 3?","Thyroid Gland","Position 3 is the Thyroid Gland: the gland wrapped around the trachea in the neck of the left-hand figure.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 4?","Parathyroid Glands","Position 4 is the Parathyroid Glands: the four small glands on the back of the thyroid, shown as dots in the enlarged thyroid view.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 5?","Thymus","Position 5 is the Thymus: the elongated gland hanging below the thyroid at the top of the chest in the right-hand figure.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 6?","Adrenal Glands","Position 6 is the Adrenal Glands: the glands capping the kidneys, marked on the left-hand figure.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 7?","Pancreas","Position 7 is the Pancreas: the gland behind the stomach of the right-hand figure, reaching across toward the spleen side.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 8?","Gonads - Ovaries","Position 8 is the Gonads - Ovaries: the ovaries of the left-hand (female) figure, at the ends of the fallopian tubes.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 9?","Gonads - Testes","Position 9 is the Gonads - Testes: the testes of the right-hand (male) figure, at the bottom of the diagram.",LB_ENDO,FIG_ENDO); },
]),["The two figures show the same gland system in a female (left) and a male (right); the circles enlarge the brain glands and the thyroid glands."]);
