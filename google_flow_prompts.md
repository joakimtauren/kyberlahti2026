# KyberLahti 2025: The 45-Minute Visual Architecture (Prompt Sequences)

This document contains the complete visual blueprint for the 45-minute Kyberlahti keynote. It is engineered using the combined principles of **Nancy Duarte** (Sparkline/Resting States), **Stinson Design** (Agency Holding Slides), and **Buffalo 7** (Hyper-realistic Prompting).

**V4 SCRIPT ALIGNMENT (MR. ROBOT AESTHETIC):** These prompts have been explicitly re-aligned to perfectly match the spoken metaphors in `final_script2.md` (e.g., The Crowdstrike airline outage, the Castle vs. Hotel Zero Trust metaphor) while retaining the oppressive, paranoid *Mr. Robot* cinematography (extreme lower-quadrant framing, heavy negative space, sickly lighting).

## The Presentation Pacing Model: "The Cinematic Hold"
To fill a 45-minute slot professionally, we use the **Cinematic Hold** architecture:
1. **The 'What Is' (Holding Slide):** You speak to a breathtaking, static `start_frame.jpg`.
2. **The Mechanism (Transition):** When you click 'next', a cinematic `transition.mp4` bridges the gap.
3. **The 'New Bliss' (Holding Slide):** The video resolves perfectly into the static `end_frame.jpg`, giving you a new resting state to talk over.

## INSTRUCTIONS FOR GOOGLE FLOW:
For every sequence below, you must generate three separate assets and save them to `/react-presentation/public/assets/`:
1. Generate **`ACT_[X]_start.jpg`** using the Star Frame prompt.
2. Provide `ACT_[X]_start.jpg` as the *Initial Image* to generate **`ACT_[X]_end.jpg`**.
3. Provide *both* images to Veo/Lumiere using the **Video Transition Prompt** to generate **`ACT_[X]_transition.mp4`**.

---

### SEQUENCE 1 (ACT I): The Oracle / Crowdstrike Outage
**Script Alignment:** Lines 46-47 ("When the CEO of Delta Airlines was losing 50 million dollars a day, and thousands of people were sleeping on the floor of airports... The entire global translation layer failed.")

```json
{
  "sequence": "ACT I: THE HOOK / CROWDSTRIKE",
  "start_frame_image_prompt": {
    "filename": "ACT_1_start.jpg",
    "subject": "A massive, deserted modern airport terminal at night. Outside the massive glass windows, dozens of commercial airplanes sit grounded in the dark.",
    "environment": "A claustrophobic, brutalist concrete airport concourse. No human life.",
    "lighting": "The only light source is a harsh, cold, flickering monitor-blue light emitting from thousands of crashed departure screens.",
    "camera": "Extreme low angle, pushed into the bottom right corner of the frame. Massive, oppressive empty concrete ceiling takes up the top 2/3rds of the image (Mr. Robot aesthetic).",
    "color_palette": "Deep pitch blacks, sickly monitor blue, heavy analog film grain.",
    "mood": "Paranoid, isolated, catastrophic systemic failure.",
    "style": "Cinematic 35mm photography, gritty realism."
  },
  "end_frame_image_prompt": {
    "filename": "ACT_1_end.jpg",
    "directive": "USE START_FRAME AS BASE IMAGE.",
    "augmentation": "Keep the exact same framing and grounded airplanes outside. Turn off all the blue monitor lights. The entire airport terminal is plunged into pure darkness, except for a single, terrifying, intense crimson-red emergency strobe light rotating through the dust."
  },
  "video_generation_prompt": {
    "filename": "ACT_1_transition.mp4",
    "mechanism": "The cold blue departure screens violently flicker and die one by one in rapid succession, plunging the massive airport into pitch black. After a half-second of total darkness, a blinding, blood-red emergency strobe light violently kicks on, casting terrifying rotating shadows across the empty terminal.",
    "pacing": "Systemic rolling failure, sudden exposure shift, paranoid horror pacing."
  }
}
```

---

### SEQUENCE 2 (ACT II): The Jumbo Frame (Cognitive DOS)
**Script Alignment:** Lines 81-89 ("You are sending a 9000-byte jumbo frame of pure technical jargon to a biological system that can only handle 1500 bytes.")

```json
{
  "sequence": "ACT II: AMYGDALA HIJACK",
  "start_frame_image_prompt": {
    "filename": "ACT_2_start.jpg",
    "subject": "A perfect, pristine, hollow glass sphere floating completely still.",
    "environment": "A pitch-black, infinite void.",
    "lighting": "A single, incredibly harsh, cold monitor-blue rim light heavily overexposing one edge of the glass.",
    "camera": "Extreme lower left quadrant framing. The glass sphere is tiny in the bottom corner. The rest of the 16:9 frame is completely dead, empty black space.",
    "style": "Unreal Engine 5 render, clinical, photorealistic physics, heavy film grain."
  },
  "end_frame_image_prompt": {
    "filename": "ACT_2_end.jpg",
    "directive": "USE START_FRAME AS BASE IMAGE.",
    "augmentation": "The glass sphere is completely destroyed, shattered into thousands of sharp shards exploding violently outward. The pitch-black void is filled with intense, chaotic crimson and sodium dot-matrix light reflecting off the flying shards."
  },
  "video_generation_prompt": {
    "filename": "ACT_2_transition.mp4",
    "mechanism": "A massive, blurry, glowing red geometric shape flies in from the deep background at blistering speed and violently collides with the fragile glass sphere in extreme slow motion. The sphere shatters into an exploding cloud of shards flying toward the camera.",
    "pacing": "Abrupt impact followed by ultra slow-motion rigid body destruction. Gritty analog VHS tracking artifacts."
  }
}
```

---

### SEQUENCE 3 (ACT III): Zero Trust Architecture
**Script Alignment:** Lines 130-131 ("Our current network is a medieval castle... Zero-Trust converts the castle into a modern, high-security hotel.")

```json
{
  "sequence": "ACT III: ZERO TRUST (CASTLE TO HOTEL)",
  "start_frame_image_prompt": {
    "filename": "ACT_3_start.jpg",
    "subject": "A massive, heavy, brutalist stone castle archway leading into absolute blackness.",
    "environment": "Cold, sterile, and oppressively dark ancient architecture.",
    "lighting": "Sickly, cold moonlight casting long, threatening shadows and highlighting the rough stone texture.",
    "camera": "Extreme lower-quadrant framing. The stone arch is in the bottom right, with massive, heavy black negative space above it.",
    "color_palette": "Desaturated, cold stone grays, pitch black, heavy grain.",
    "style": "Gritty architectural photography, terrifying and insecure."
  },
  "end_frame_image_prompt": {
    "filename": "ACT_3_end.jpg",
    "directive": "USE START_FRAME AS BASE IMAGE.",
    "augmentation": "The ancient stone archway is gone. In the exact same spot is a sleek, hyper-modern, brutalist steel hotel door glowing with a thick, secure, impenetrable neon-cyan locking bar."
  },
  "video_generation_prompt": {
    "filename": "ACT_3_transition.mp4",
    "mechanism": "The heavy, insecure stone castle archway rapidly crossfades and visually morphs into the sleek, modular, hyper-secure modern steel hotel door. The cold moonlight is replaced by the sharp, contained intensity of the neon-cyan security lock.",
    "pacing": "Cold, clinical, highly technological metamorphosis."
  }
}
```

---

### SEQUENCE 4 (ACT III): Supply Chain Attack 
**Script Alignment:** Lines 159-161 ("It’s like a poisoner sneaking into the city water treatment plant...")

```json
{
  "sequence": "ACT III: THE POISONED WELL",
  "start_frame_image_prompt": {
    "filename": "ACT_4_start.jpg",
    "subject": "The surface of a perfectly still, pristine pool of black water reflecting light like a perfect mirror.",
    "environment": "A colossal, dark underground concrete reservoir.",
    "lighting": "Nearly pitch black, illuminated only by a single row of distant, sickly fluorescent tubelights.",
    "camera": "Low angle tracking shot skimming just millimeters above the water surface, extreme wide angle lens causing subtle edge distortion.",
    "style": "Gritty, claustrophobic cinematic photography."
  },
  "end_frame_image_prompt": {
    "filename": "ACT_4_end.jpg",
    "directive": "USE START_FRAME AS BASE IMAGE.",
    "augmentation": "The black water surface is now violently rippling outward, infected with a glowing, blinding neon terminal-green liquid spreading rapidly and illuminating the dark concrete walls."
  },
  "video_generation_prompt": {
    "filename": "ACT_4_transition.mp4",
    "mechanism": "From the pure darkness of the ceiling, a single glowing terminal-green droplet falls in ultra slow-motion. It impacts the perfectly pristine mirror-like water surface. The point of impact instantly creates a terrifying, intensely glowing ripple of neon-green fluid that slowly spreads to infect the entire reservoir.",
    "pacing": "Hypnotic, agonizingly slow fluid dynamics, cold and clinical."
  }
}
```

---

### SEQUENCE 5 (ACT V): The Architecture of Agreement
**Script Alignment:** Lines 226-228 ("But in the corporate world, there are three kinds of 'Yes'... It makes them anxious. Their firewall rule is to block you with a Counterfeit Yes.")

```json
{
  "sequence": "ACT V: THE COUNTERFEIT YES",
  "start_frame_image_prompt": {
    "filename": "ACT_5_start.jpg",
    "subject": "The word YES carved deeply into a massive, heavy, pristine silver steel wall.",
    "environment": "A solid, featureless steel surface.",
    "lighting": "Harsh, uninviting, cold and flat white light, like an interrogation room.",
    "camera": "Straight-on medium shot, but pushed into the extreme upper left quadrant of the frame. The bottom 2/3rds of the image is just blank, sterile steel (Mr Robot framing).",
    "style": "Hyper-realistic macro photography, cold and clinical."
  },
  "end_frame_image_prompt": {
    "filename": "ACT_5_end.jpg",
    "directive": "USE START_FRAME AS BASE IMAGE.",
    "augmentation": "Keep the extreme upper-left quadrant framing. The silver steel wall is now heavily oxidized, destroyed, covered in deep, bleeding, dark-orange corrosive rust and peeling metal flakes. The carved word YES is rotting away."
  },
  "video_generation_prompt": {
    "filename": "ACT_5_transition.mp4",
    "mechanism": "The pristine bright silver steel wall rapidly ages, corrodes, and decays in a fast time-lapse. Deep dark-orange rust spreads like an infection across the surface, bubbling and flaking the metal away until the word YES is almost completely consumed by rot.",
    "pacing": "Jerky, stuttering, aggressive time-lapse."
  }
}
```

---

### SEQUENCE 6 (ACT VII): The Sisu Override
**Script Alignment:** Lines 376-380 ("An AI has perfect data. But an AI does not have Sisu... A dashboard cannot share the burden of fear. Only a human being can do that.")

```json
{
  "sequence": "ACT VII: BURDEN OF FEAR",
  "start_frame_image_prompt": {
    "filename": "ACT_6_start.jpg",
    "subject": "A violent, chaotic, hyper-kinetic tornado of glowing red and cold monitor-blue geometric sparks swirling aggressively.",
    "environment": "A vast, pitch-black void filled with heavy digital static and grain.",
    "lighting": "Chaotic, strobing, blinding pulses of threat-red and blue light exploding from the center of the storm.",
# Presentation Assets: Buffalo 7 Agency Spec (Final Script 2.0)

**Aesthetic Guidelines (Strict Enforcement):**
*   **Vibe:** Mr. Robot, clinical, oppressive, corporate thriller.
*   **Color Palette:** Vantablack, sickly fluorescent greens, cold server-room blues, aggressive terminal reds.
*   **Composition:** Extreme negative space, subjects pushed to the lower quadrants.
*   **Prompt Format:** Buffalo 7 Strict JSON framework (subject, environment, lighting, camera, color_palette, mood, style, composition).

---

## ACT 1: THE CROWDSTRIKE OUTAGE (Static)
**Buffalo 7 Rationale:** The speaker is setting the tone by referencing the Delta Airlines grounding. A video loop is distracting here. We need a massive, cold, static image of systemic failure.
**Asset Type:** STATIC IMAGE (Imagen 3)

### Prompt 1: Static Image
```json
{
  "sequence_id": "ACT_1_CROWDSTRIKE_STATIC",
  "subject": "A vast, completely deserted, hyper-modern airport terminal at night. Massive floor-to-ceiling windows look out onto dozens of grounded airplanes. Dead departure screens hang from the ceiling.",
  "environment": "An airport terminal that feels like a morgue. Cold, empty, vast.",
  "lighting": "All normal lights are dead. The only illumination is a terrifying, deep emergency red strobe light casting long, harsh shadows across the empty terminal floor.",
  "camera": "14mm wide-angle lens, extreme wide shot. The ceiling crushes down, creating a claustrophobic but vast space.",
  "color_palette": "Deep Vantablack, blinding emergency LED red, cold steel grey.",
  "mood": "Systemic failure, dread, costly silence, apocalyptic.",
  "style": "Hyper-realistic architectural photography, highly detailed reflections on the polished floor, cinematic grading.",
  "composition": "Asymmetrical. The grounded planes are visible in the lower right. 70% of the image is the massive, oppressive, dark architecture above.",
  "filename": "ACT_1_crowdstrike_static.jpg"
}
```

---

## ACT 2: THE JUMBO FRAME (Video)
**Buffalo 7 Rationale:** The script calls for a "glowing red wireframe packet moving towards a tiny glass aperture. It shatters." This is a violent, physical representation of a cognitive breakdown. Motion is mandatory.
**Asset Type:** VIDEO SEQUENCE (Veo 3.1 Cinematic Hold)

### Prompt 1: Start Frame (Image)
```json
{
  "sequence_id": "ACT_2_JUMBO_FRAME_START",
  "subject": "A massive, heavy, glowing red digital wireframe cube (a data packet) floating ominously in front of a thin, fragile, beautifully pristine pane of glass.",
  "environment": "A pitch-black, sensory-deprivation digital void.",
  "lighting": "The only light source is the aggressive, pulsating red luminescence emitting from the wireframe cube itself, reflecting brightly off the fragile glass.",
  "camera": "50mm lens, medium close-up, strict profile side-angle. The cube is on the left, the glass is on the right.",
  "color_palette": "Absolute Vantablack, violent terminal red, crystal clear glass reflections.",
  "mood": "Imminent destruction, overwhelming force, tension.",
  "style": "High-end 3D motion graphics still, Unreal Engine 5 render, hyper-detailed glass refraction.",
  "composition": "Tension-based symmetry. The massive red cube dominates the left, pushing against the thin vertical line of glass on the right.",
  "filename": "ACT_2_start.jpg"
}
```

### Prompt 2: End Frame (Image)
```json
{
  "sequence_id": "ACT_2_JUMBO_FRAME_END",
  "subject": "The fragile glass pane has completely shattered into thousands of tiny, razor-sharp shards suspended mid-air. The massive red wireframe cube is aggressively pushing through the broken glass.",
  "environment": "The same dark void, now filled with floating glass debris.",
  "lighting": "The red light from the cube now aggressively catches and fractures through every single floating shard of glass, creating a chaotic explosion of red laser-like reflections.",
  "camera": "50mm lens, identical strict profile side-angle.",
  "color_palette": "Absolute Vantablack, explosive fractured red light.",
  "mood": "Catastrophic failure, breakdown, aggression, overwhelming force.",
  "style": "High-end 3D motion graphics still, highly detailed physics simulation of shattered glass.",
  "composition": "Chaotic. The glass shards fill the right half of the frame, bursting outward.",
  "reference_image": "ACT_2_start.jpg",
  "filename": "ACT_2_end.jpg"
}
```

### Prompt 3: Transition (Video)
```json
{
  "sequence_id": "ACT_2_JUMBO_FRAME_TRANSITION",
  "source_material": ["ACT_2_start.jpg", "ACT_2_end.jpg"],
  "motion_description": "The massive, heavy red wireframe cube accelerates forward with extreme violence, slamming into the fragile pane of pristine glass. The glass instantly shatters into thousands of microscopic shards in extreme slow-motion. The red light from the cube refracts through the exploding glass debris, creating a terrifying, chaotic shower of red light. The camera physically shakes on impact.",
  "duration_seconds": 3,
  "filename": "ACT_2_transition.mp4"
}
```

---

## ACT 3: LOSSLESS COMPRESSION (Static)
**Buffalo 7 Rationale:** The speaker is teaching the 'Anchor, Mechanism, Impact' framework. Educational metaphors require still images to allow the audience's brain to process the spoken word. Motion hurts retention here.
**Asset Type:** STATIC IMAGES (Imagen 3)

### Prompt 1: Static Image (Zero Trust: Castle to Hotel)
```json
{
  "sequence_id": "ACT_3_ZERO_TRUST_STATIC",
  "subject": "A heavy, rotting, brutalist wooden medieval castle door. However, instead of an iron iron lock, a sleek, glowing neon-blue digital hotel keycard reader is bolted directly into the ancient wood.",
  "environment": "A dark, highly textured stone castle corridor.",
  "lighting": "High contrast chiaroscuro. Deep shadows on the rotting wood, pierced by the crisp, clean, clinical neon blue light emitting from the modern keycard reader.",
  "camera": "85mm lens, close-up on the handle and keycard reader. Shallow depth of field.",
  "color_palette": "Dead browns, rough greys, pristine clinical neon blue.",
  "mood": "Technological evolution, secure, anachronistic, precise.",
  "style": "Hyper-realistic conceptual photography, extreme texture detail on the wood and modern plastic.",
  "composition": "The glowing blue keycard reader is pinned perfectly to the lower-right third intersection, acting as the undeniable focal point.",
  "filename": "ACT_3_zero_trust.jpg"
}
```

### Prompt 2: Static Image (Supply Chain: Poisoned Water)
```json
{
  "sequence_id": "ACT_3_SUPPLY_CHAIN_STATIC",
  "subject": "A massive, complex intersection of pristine transparent glass pipes in a brutalist water treatment plant. 99% of the water flowing is perfectly clear, but a single, highly concentrated vein of luminescent, toxic neon-green liquid is injecting into the central flow.",
  "environment": "A dark, sterile, industrial underground facility.",
  "lighting": "The only significant light comes from the terrifying, sickly neon-green glow of the toxic liquid illuminating the clean glass pipes from the inside out.",
  "camera": "35mm lens, symmetrical low angle, looking up at the pipeline intersection.",
  "color_palette": "Sterile glass greys, pure water blues, highly toxic luminescent neon green.",
  "mood": "Insidious, systemic infection, unseen danger, critical failure.",
  "style": "Cinematic architectural rendering, highly detailed fluid dynamics within the glass pipes.",
  "composition": "Perfect brutalist symmetry. The toxic green injection point is in the dead center of the frame.",
  "filename": "ACT_3_supply_chain.jpg"
}
```

---

## ACT 5: THE SHATTERED YES (Video)
**Buffalo 7 Rationale:** The script explicitly calls for the word "YES" to shatter and reform into "NO". This is a dynamic transition of power and psychology.
**Asset Type:** VIDEO SEQUENCE (Veo 3.1 Cinematic Hold)

### Prompt 1: Start Frame (Image)
```json
{
  "sequence_id": "ACT_5_SHATTERED_YES_START",
  "subject": "The word 'YES' carved deeply into a massive, heavy, pristine sheet of brushed stainless steel. The steel looks immaculate, unbreakable, and absolute.",
  "environment": "A pitch-black studio setting. The steel plate is the only object in existence.",
  "lighting": "Clinical, precise studio lighting highlighting the sharp, clean edges of the carved letters.",
  "camera": "100mm Macro lens, extreme close up. Shallow depth of field focusing strictly on the 'E' in 'YES'.",
  "color_palette": "Cold gunmetal grey, pristine silver highlights, absolute black background.",
  "mood": "Absolute, unyielding, permanent, deceptive.",
  "style": "Hyper-realistic macro product photography, incredible texture on the brushed steel.",
  "composition": "The word 'YES' is dead center, dominating the frame.",
  "filename": "ACT_5_start.jpg"
}
```

### Prompt 2: End Frame (Image)
```json
{
  "sequence_id": "ACT_5_SHATTERED_YES_END",
  "subject": "The massive steel plate has violently shattered. The shards have magnetically reformed in the center of the frame to spell the word 'NO'. The steel is no longer pristine; it is jagged, rough, and industrial.",
  "environment": "The same pitch-black studio setting.",
  "lighting": "Harsh, dramatic side-lighting casting long, threatening shadows across the jagged, reformed metal letters.",
  "camera": "100mm Macro lens, identical framing.",
  "color_palette": "Dark, rough gunmetal grey, deep shadows, absolute black background.",
  "mood": "Violent change, hard truth, boundary setting, finality.",
  "style": "Hyper-realistic macro photography, highly detailed jagged metal edges.",
  "composition": "The word 'NO' sits dead center, but the edges of the frame are empty, as the steel plate no longer fills the space.",
  "reference_image": "ACT_5_start.jpg",
  "filename": "ACT_5_end.jpg"
}
```

### Prompt 3: Transition (Video)
```json
{
  "sequence_id": "ACT_5_SHATTERED_YES_TRANSITION",
  "source_material": ["ACT_5_start.jpg", "ACT_5_end.jpg"],
  "motion_description": "The pristine, heavy steel plate with the word 'YES' violently shatters into dozens of heavy, jagged chunks of metal in extreme slow motion. For a split second, they hang suspended in the black void. Suddenly, an invisible magnetic force violently pulls the jagged shards back together with a heavy, metallic crunching sound, snapping them into place to form the cold, hard word 'NO'.",
  "duration_seconds": 4,
  "filename": "ACT_5_transition.mp4"
}
```

---

## ACT 7: THE SISU OVERRIDE (Video)
**Buffalo 7 Rationale:** The emotional climax of the presentation. We visualize the chaotic 3:00 AM P1 War Room, which then completely freezes and resolves into a singular, calm human override. This relies entirely on the contrast of chaotic motion stopping instantly.
**Asset Type:** VIDEO SEQUENCE (Veo 3.1 Cinematic Hold)

### Prompt 1: Start Frame (Image)
```json
{
  "sequence_id": "ACT_7_SISU_OVERRIDE_START",
  "subject": "Absolute digital chaos. A violent tornado of shattered glass, frantic red warning lights, and glitching, unreadable terminal code swirling in a massive, overwhelming vortex.",
  "environment": "A vast, pitch-black void filled with heavy digital static and grain.",
  "lighting": "Chaotic, strobing, blinding pulses of threat-red and blue light exploding from the center of the storm.",
  "camera": "Extreme wide shot, skewed dutch angle to induce vertigo and paranoia.",
  "color_palette": "Violent emergency reds, cold monitor blues, deep Vantablack void.",
  "mood": "Absolute panic, system failure, 3:00 AM terror, loss of control.",
  "style": "Unreal Engine 5 render, highly detailed particle simulation overlaid with analog VHS tracking static.",
  "composition": "There is no focal point. The frame is 100% full of chaotic, terrifying noise and motion lines.",
  "filename": "ACT_7_start.jpg"
}
```

### Prompt 2: End Frame (Image)
```json
{
  "sequence_id": "ACT_7_SISU_OVERRIDE_END",
  "subject": "A perfectly calm, starkly empty void. In the extreme bottom center of the frame, a lone human silhouette stands resolute against the vast emptiness. The surrounding chaos has been pushed entirely off-screen.",
  "environment": "A pure, unblemished digital void.",
  "lighting": "Deep vantablack throughout, with a single, incredibly piercing, calm beam of pure white light illuminating the silhouette from above.",
  "camera": "Extreme wide shot, mathematically perfect symmetry. The camera is perfectly level.",
  "color_palette": "Deep Vantablack, brilliant, pristine icy white.",
  "mood": "Absolute clarity, calm under pressure, human authority, sisu, silence.",
  "style": "Cinematic conceptual art, minimalist, hyper-crisp lighting.",
  "composition": "95% negative space. The human silhouette is anchored in the absolute bottom center. The white light creates a perfect vertical line of authority.",
  "reference_image": "ACT_7_start.jpg",
  "filename": "ACT_7_end.jpg"
}
```

### Prompt 3: Transition (Video)
```json
{
  "sequence_id": "ACT_7_SISU_OVERRIDE_TRANSITION",
  "source_material": ["ACT_7_start.jpg", "ACT_7_end.jpg"],
  "motion_description": "The violent storm of glass, red light, and code swirls violently. Suddenly, it hits an invisible wall and freezes entirely in mid-air. The chaotic elements are instantly forced outward in a synchronized, slow-motion shockwave, blowing away all the red light and debris entirely off-screen. As the chaos clears, a stark, pure beam of white light snaps on, illuminating a single, calm human silhouette standing in the center of the now-peaceful black void.",
  "duration_seconds": 6,
  "filename": "ACT_7_transition.mp4"
}
```
