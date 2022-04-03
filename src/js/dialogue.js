window.getDialogue = function(dialogue_id) {
    switch(dialogue_id) {
      ////// Fluffy Birth
      // TODO: Add personality-specific dialogue
      case 'fluffy_birth_default':
        return `BIGGES' POOPIES!!`
      case 'fluffy_birth_fertility_down':
        return `huuhuu... wai speshaw pwace huwties?`
      case 'fluffy_birth_fertility_zero':
        return `speshaw pwace hab' wowstes' huwties... <fluffy> nu can hab' babbehs nu mowe...`

      ////// Fluffy Birth Rejection
      case 'fluffy_rejection_fear':
        return `<title> hewp... miwkie thief... sabe gud fwuffy mummah, <title>... hu hu hu...`
      case 'fluffy_rejection_discipline_good':
        return `<fluffy> am gud mummah! wuv' aww babbehs!`
      case 'fluffy_rejection_discipline_bad':
        return `bu' <fluffy> am gud'! wai gib' huwties? huuhuu!`
      case 'fluffy_rejection_ignore':
        return `nu! bad babbeh! nu miwkies fow 'ou!`
      case 'fluffy_rejection_take':
        return `yus, <title> taek bad babbeh 'way.`

      // Diligent
      case 'fluffy_rejection_diligent_temperament_high':
        return `miwkies onwy fow bestes' babbehs! nu miwkies fow poopie babbeh!`
      case 'fluffy_rejection_diligent_temperament_low':
        return `Nu hab time… maybe gib' tu wonewy mummah wifout babbehs?`
      // Bossy
      case 'fluffy_rejection_bossy_temperament_high':
        return `poopie babbeh gu 'way ow gid wowses' huwties!`
      case 'fluffy_rejection_bossy_temperament_low':
        return `nu wan' gib' wub to wowstes' poopie babbeh...`
      // Curious
      case 'fluffy_rejection_curious_temperament_high':
        return `wai hab wowstes', ugwy poopie babbeh? nu pwetty?`
      case 'fluffy_rejection_curious_temperament_low':
        return `nu wike wowstes' babbeh...`
      // Timid
      case 'fluffy_rejection_timid_temperament_high':
        return `<title>... nu wan' ugwy babbeh...`
      case 'fluffy_rejection_timid_temperament_low':
        return `dat one am bad babbeh... <fluffy> sowwy...`
      // Pensive
      case 'fluffy_rejection_pensive_temperament_high':
        return `nu hab miwkies fow bad babbehs, poopie babbeh nu get miwkies`
      case 'fluffy_rejection_pensive_temperament_low':
        return `odda babbehs need miwkies a wot mowe....`
      // Dull
      case 'fluffy_rejection_dull_temperament_high':
        return `nu cawe 'bout poopie babbeh! nu wub'`
      case 'fluffy_rejection_dull_temperament_low':
        return `poopie babbeh... nu get wub ow huggies.`
      // Sweet
      case 'fluffy_rejection_sweet_temperament_high':
        return `babbeh su bad… ruin fwuffpiwe… ruin ebbyting...`
      case 'fluffy_rejection_sweet_temperament_low':
        return `poopie babbeh... nu wan... huu huu....`
      // Haughty
      case 'fluffy_rejection_haughty_temperament_high':
        return `nu wike poopie babbeh an' nu gib' ANEE wub ow huggies`
      case 'fluffy_rejection_haughty_temperament_low':
        return `wub' and huggies bad fow poopie babbehs, nu gib' huggies...`
      // Playful
      case 'fluffy_rejection_playful_temperament_high':
        return `poopie babbeh? dat nu am <fluffy> babbeh, nu nee' gib' wuv'`
      case 'fluffy_rejection_playful_temperament_low':
        return `wan'ed pwetty babbeh... dis am poopie babbeh...`
      // Rowdy
      case 'fluffy_rejection_rowdy_temperament_high':
        return `hatechu, poopie babbeh, nu wan'.`
      case 'fluffy_rejection_rowdy_temperament_low':
        return `nu wan' stupi dummeh poopie babbeh.`
      case 'fluffy_rejection_default':
        return `dummeh poopie babbeh...`

      ////// Fluffy Stillbirth
      // Foals
      case 'fluffy_stillbirth_fussy':
        return `babbeh nu chwip? nu wuv mummah <fluffy>?`
      case 'fluffy_stillbirth_shy':
        return `h-hewwo... babbeh? mummah nu bothew... huu huu...`
      case 'fluffy_stillbirth_lazy':
        return `babbeh? wai nu cum to mummah <fluffy>?`
      case 'fluffy_stillbirth_cute':
        return `hewwo nicest babbeh, <fluffy> am gud mummah, cum to mummah, pwease...`
      case 'fluffy_stillbirth_peppy':
        return `babbeh! babbeh! wai babbeh nu bweefies?`

      // Adults
      case 'fluffy_stillbirth_diligent':
        return `huu huu... widdow babbeh has fowever sweepies...`
      case 'fluffy_stillbirth_bossy':
        return `dummeh babbeh! cum to <fluffy> wight nao!`
      case 'fluffy_stillbirth_curious':
        return `babbeh? need huggies? need wuv? mummah gib' huggies!`
      case 'fluffy_stillbirth_timid':
        return `h-hewwo babbeh... n-nu wub' mummah...?`
      case 'fluffy_stillbirth_pensive':
        return `<fluffy> babbehs nu gud?`
      case 'fluffy_stillbirth_dull':
        return `<fluffy> wuv' babbehs, siwwy nu chiwpy babbeh.`
      case 'fluffy_stillbirth_sweet':
        return `babbeh? wai nu chiwp? babbeh need miwkies... huhuhu am worstest mummah...`
      case 'fluffy_stillbirth_haughty':
        return `bad babbeh, gib' mummah heawt huwties. nu wuv' bad babbeh.`
      case 'fluffy_stillbirth_playful':
        return `wai babbeh nu play wid' mummah? <fluffy> wuv' chu...`
      case 'fluffy_stillbirth_rowdy':
        return `<fluffy> wan' pway with babbeh, but babbeh am bad.`

      ////// Fluffy Smarty
      //// Foals
      case 'fluffy_smarty_fussy':
			  return `GIVE BESTES' TOYS AN' NUMMIES TO BESTES' BABBEH WITE NAO!`
      case 'fluffy_smarty_peppy':
			  return `bestes' babbeh need bestes' toys, nu gib' to dummeh babbehs.`
      case 'fluffy_smarty_lazy':
			  return `nu wake babbeh fwom nappies ow git sowwy poopies.`
      case 'fluffy_smarty_cute':
			  return `tehehehe. <fluffy> is bestes', pwetties' babbeh!`
      case 'fluffy_smarty_shy':
			  return `<fluffy> is bestes'... odda fwuffies am dummeh...`

      //// Adults
      case 'fluffy_smarty_bossy':
        return `<fluffy> am smarty now! dummeh fwuffies am hewd nao!`
      case 'fluffy_smarty_haughty':
        return `<fluffy> is bestes' smawty, dummehs do what smawty say!`
      case 'fluffy_smarty_rowdy':
        return `dis am smawty wand nao, wisten ow gid' wowstes' sowweh hoofsies.`
      case 'fluffy_smarty_diligent':
        return `wet smawty ous'side! <fluffy> wan have hewd!`
      case 'fluffy_smarty_curious':
        return `smawty fink dummeh <title> hide bested nummies, smawty gonna find aww da nummies!`
      case 'fluffy_smarty_playful':
        return `gib' nyu toysies fow fwuffy nao ow gid' sowweh poopies!`
      case 'fluffy_smarty_dull':
        return `<title> nu know <fluffy> am smawty, neba find out, dummeh <title>`
      case 'fluffy_smarty_timid':
        return `smawty be cawefuw, nu wet hooman fin' out am smawty...`
      case 'fluffy_smarty_pensive':
        return `<fluffy> nee' gid' out, wun 'way, maek bestes' hewd.`
      case 'fluffy_smarty_sweet':
        return `<fluffy> wan' speshaw' wub! fwuffy am bestes' an pwetties' fwuffy!`

      ////// Fluffy Bonding
      // TODO: Add personality-specific dialogue
      case 'fluffy_bonding_breakup':
        return `huu huu... wowstes' heawt huwties...`
      //// Male
      case 'fluffy_bonding_male':
        return `hewwo pwetty mawe, wan' be speshaw fwens wid' <fluffy>?`
      //// Female
      case 'fluffy_bonding_female':
        return `yus, <fluffy> wan' be speshaw fwens!`
      //// Breakup
      case 'fluffy_breeding_breakup':
        return `HUUUU, <fluffy> wan' speshaw fwen back!`

      ////// Fluffy Mating
      // TODO: Add personality-specific dialogue
      case 'fluffy_mating_deny':
        return `huhu... bu' babbehs am bestes' fing...`
      case 'fluffy_mating_allow':
        return `enf... enf... ENF... GUD FEEWS!!`

      ////// Fluffy Starvation
      // TODO: Add personality-specific dialogue
      case 'fluffy_starvation_default':
        return `huu huu... <fluffy> hab wowstes' tummy huwties...`
      case 'fluffy_starvation_end':
        return `tank 'ou fow nummies, <title>...`
      // Bossy
      case 'fluffy_starvation_bossy':
        return `dummeh <title>, gib' <fluffy> nummies wite nao!`
      case 'fluffy_starvation_bossy_end':
        return `dank 'ou for nummies, <fluffy> wub nummies'`
      // Timid
      case 'fluffy_starvation_timid':
        return `c-can pwease hab nummies nice <title>?...nu w..wiw ask 'gain'`
      case 'fluffy_starvation_timid_end':
        return `t-tank 'ou nice <title>... <fluffy> wub yu...`
      // Sweet
      case 'fluffy_starvation_sweet':
        return `<title>, can <fluffy> pwease hab nummies? pwetty pwease? nu wan sketti, jus' nummies`
      case 'fluffy_starvation_sweet_end':
        return `tank 'ou nicest <title>! <fluffy> wub 'ou moa den skettis!`

      ////// Fluffy Suffering
      // TODO: Add personality-specific dialogue
      case 'fluffy_suffering_default':
        return `huhuhu, <fluffy> hab su many huwties..`
      case 'fluffy_suffering_mental':
        return `head huwties gu 'way, 'ou nu am weal!`

      ////// Fluffy Interact (playing, shearing)
      // TODO: Add stat-specific dialogue

      ///// Shearing
      // TODO: Add personality-specific dialogue
      case 'fluffy_interact_shearing':
        return `huu huu... wai taek pwetty fwuff fwom <fluffy>?`

      ///// Playing
      // TODO: Add personality-specific dialogue
      case 'fluffy_interact_playing':
        return `<fluffy> am bestest at pwayin'! pway AWW da games wit' <title>, heheheh!`

      ///// Training
      // TODO: Add personality-specific dialogue
      case 'fluffy_interact_train':
        return `<fluffy> feew happeh and stwong! wan' pway aww day wong!`

      ///// naming
      // TODO: Add personality-specific dialogue
      case 'fluffy_interact_name':
        return `<fluffy> wuv\' nyu namesie!!`
      case 'fluffy_interact_rename':
        return `bu\'... wike\' old namesie...otay, fwuffy am called <fluffy> nao`

      //// Foals
      case 'fluffy_interact_baby':
        return `cheep... cheep...`
      // Fussy
      case 'fluffy_interact_fussy_happy':
        return `<title>! bestest babbeh can hab' nyu toysies pwease?`
      case 'fluffy_interact_fussy_sad':
        return `dummeh <title>... gib' <fluffy> wowstes' saddies...`
      // Shy
      case 'fluffy_interact_shy_happy':
        return `h-hewwo <title>... yus, <fluffy> am happies...`
      case 'fluffy_interact_shy_sad':
        return `huhuhu... wai gib' saddies to <fluffy>... huhu...`
      // Lazy
      case 'fluffy_interact_lazy_happy':
        return `hewwo <title>, tank' 'ou fow nummies an' housie.`
      case 'fluffy_interact_lazy_sad':
        return `<title>, gib' nummies fow make saddies gu 'way?`
      // Cute
      case 'fluffy_interact_cute_happy':
        return `wub' 'ou <title>! 'ou am da bestest <title>!`
      case 'fluffy_interact_cute_sad':
        return `huhuhu... wai nu wub' fow gud <fluffy>? nu wan' saddies...`  
      // Peppy
      case 'fluffy_interact_peppy_happy':
        return `tank' 'ou fow toysies <title>! <fluffy> am happies!`
      case 'fluffy_interact_peppy_sad':
        return `wai nu mowe toysies fow <fluffy>? su saddies...`

      //// Adults
      case 'fluffy_interact_default':
        return `hewwo <title>!`
      case 'fluffy_interact_depressed':
        return `<fluffy> wan die...`
      // Diligent
      case 'fluffy_interact_diligent_happy':
        return `hewwo <title>, <fluffy> am su happies to see 'ou!`
      case 'fluffy_interact_diligent_sad':
        return `hewwo <title>... <fluffy> hab' saddies...`
      // Bossy
      case 'fluffy_interact_bossy_happy':
        return `<title>, <fluffy> am gud fwuffy, gib' skettis nao.`
      case 'fluffy_interact_bossy_sad':
        return `dummeh <title>! gib\' <fluffy> skettis ow get sowweh poopies!`
      // Curious
      case 'fluffy_interact_curious_happy':
        return `<fluffy> am otay, how is 'ou, <title>?`
      case 'fluffy_interact_curious_sad':
        return `<fluffy> hab saddies... <title> hewp <fluffy>?`
      // Timid
      case 'fluffy_interact_timid_happy':
        return `<fluffy> am happies... tank \'ou fow nicest homesies...`
      case 'fluffy_interact_timid_sad':
        return `pwease nu huwt <fluffy> fow hab saddies, <title>...`
      // Pensive
      case 'fluffy_interact_pensive_happy':
        return `oh, hewwo <title>, <fluffy> am otay, tank 'ou.`
      case 'fluffy_interact_pensive_sad':
        return `<fluffy> hab' saddies... nu nu wai...`
      // Dull
      case 'fluffy_interact_dull_happy':
        return `hewwo <title>, it nice tu see 'ou.`
      case 'fluffy_interact_dull_sad':
        return `<fluffy> am su saddies... huu...`
      // Sweet
      case 'fluffy_interact_sweet_happy':
        return `hewwo <title>, <fluffy> wuv' 'ou!`
      case 'fluffy_interact_sweet_sad':
        return `huhuhu... <fluffy> hab bigges' saddies...`
      // Haughty
      case 'fluffy_interact_haughty_happy':
        return `hewwo <title>, <fluffy> am gud, can hab' skettis nao?`
      case 'fluffy_interact_haughty_sad':
        return `dummeh <title>! hatechu fow gib' saddies!`
      // Playful
      case 'fluffy_interact_playful_happy':
        return `<title>, <fluffy> am su happies! wan' pway wid <fluffy>?`
      case 'fluffy_interact_playful_sad':
        return `huhu... <title>, pway wid <fluffy> fow maek saddies gu \'way?`
      // Rowdy
      case 'fluffy_interact_rowdy_happy':
        return `'ou am gud <title>, gib' <fluffy> happies.`
      case 'fluffy_interact_rowdy_sad':
        return `dummeh <title>, <fluffy> gib' 'ou sowweh hoofsies!`

      ////// Fluffy Debut (in shops, etc.)
      // TODO: Add happiness-specific dialogue
      //// Foals
      case 'fluffy_debut_baby':
        return `cheep... cheep...`
      // Fussy
      case 'fluffy_debut_fussy':
        return `hoomin gib' nyu housie fow bestest babbeh?`
      // Shy
      case 'fluffy_debut_shy':
        return `eep... h-hewwo... nyu daddeh ow mummah fow <fluffy>?`
      // Lazy
      case 'fluffy_debut_lazy':
        return `hewwo... <fluffy> get nyu housie?`
      // Cute
      case 'fluffy_debut_cute':
        return `hewwo nicest hoomin, <fluffy> am gud babbeh, gib' nyu housie pwease?`
      // Peppy
        case 'fluffy_debut_peppy':
        return `hewwo hoomin! wan'\ pway wid fwuffy? an\' mebbeh be nyu daddeh ow mummah?`

      //// Adults
      // Diligent
      case 'fluffy_debut_diligent':
        return `hewwo nice hoomin, be nyu daddeh ow mummah fow <fluffy>?`
      case 'fluffy_debut_diligent_babies':
        return `hewwo nice hoomin, be nyu daddeh ow mummah fow <fluffy> an' babbehs'?`
      // Bossy
      case 'fluffy_debut_bossy':
        return `dummeh hoomin! gib' nyu housie nao.`
      case 'fluffy_debut_bossy_babies':
        return `dummeh hoomin! gib' nyu housie to <fluffy> an' babbehs.`
      // Curious
      case 'fluffy_debut_curious':
        return `hewwo nice hoomin, mebbeh gib' nyu housie to <fluffy>?`
      case 'fluffy_debut_curious_babies':
        return `hewwo nice hoomin, mebbeh gib' nyu housie to <fluffy> an' babbehs?`
      // Timid
      case 'fluffy_debut_timid':
        return `h-hewwo nice hoomin... pwease nu huwties... hab' babbehs...`
      case 'fluffy_debut_timid_babies':
        return `h-hewwo nice hoomin... pwease nu huwties...`
      // Pensive
      case 'fluffy_debut_pensive':
        return `wha' hoomin wan' fwom <fluffy>?`
      case 'fluffy_debut_pensive_babies':
        return `wha' hoomin wan' fwom <fluffy> an' babbehs?`
      case 'fluffy_debut_pensive_feral':
        return `<fluffy> wookin' fow nummies, hoomin hab' nummies?`
      case 'fluffy_debut_pensive_feral_babies':
        return `<fluffy> wookin' fow nummies, hoomin hab' nummies? babbehs am hungwy`
      // Dull
      case 'fluffy_debut_dull':
        return `pwease weabe <fluffy> awone, nu wan\' any twouble...`
      case 'fluffy_debut_dull_babies':
        return `pwease weabe <fluffy> an' babbehs awone, nu wan' any twouble...`
      // Sweet
      case 'fluffy_debut_sweet':
        return `hewwo nicest hoomin!! <fluffy> need nyu homesie!`
      case 'fluffy_debut_sweet_babies':
        return `hewwo nicest hoomin!! <fluffy> an' babbehs need nyu homesie!`
      case 'fluffy_debut_sweet_feral':
        return `hewwo nicest hoomin!! <fluffy> need nyu homesie fow wawmsies!`
      case 'fluffy_debut_sweet_feral_babies':
        return `hewwo nicest hoomin!! <fluffy> an' babbehs need nyu homesie fow wawmsies!`
      // Haughty
      case 'fluffy_debut_haughty':
        return `ah, hoomin hewe fow gib' <fluffy> nyu homesie?`
      case 'fluffy_debut_haughty_babies':
        return `ah, hoomin hewe fow gib' <fluffy> an' bestest babbehs nyu homesie?`
      // Playful
      case 'fluffy_debut_playful':
        return `nyu fwen? nice hoomin wan\' pway wid <fluffy>?`
      case 'fluffy_debut_playful_babies':
        return `nyu fwen? nice hoomin wan\' pway wid <fluffy> an\' babbehs?`
      // Rowdy
      case 'fluffy_debut_rowdy':
        return `hoomin gib' <fluffy> nyu homesie, am gud fwuffy.`
      case 'fluffy_debut_rowdy_babies':
        return `hoomin gib' <fluffy> nyu homesie, am gud fwuffy, hab gud' babbehs.`
      case 'fluffy_debut_rowdy_feral':
        return `<fluffy> wookin' fow nummies, hoomin gib' <fluffy> nummies?`
      case 'fluffy_debut_rowdy_feral_babies':
        return `<fluffy> wookin' fow nummies, hoomin gib' <fluffy> nummies fow babbehs?`


      default:
        return `hewwo... nyu daddeh ow mummah?`
    }
}