const express = require('express');
const router = express.Router();

const FAKE_LESSION = {
  courseTitle: 'Course Title',
  title: 'Lession Title',
  description: 'Lession Description',
  video: 'https://archive.org/download/PopeyeVideos/Popeye_Cookin_with_Gags_512kb.mp4',
  resources: [
    { name: 'project_files.zip', link: '' },
    { name: 'Callback Hell', link: 'http://callbackhell.ru/' },
  ],
  comments: [
    {
      author: { name: 'Ayrton Sweet' },
      text:
        "Sorry, I can't hangout. My uncle's cousin's sister in law's best friend's insurance agent's roommate's pet goldfish died. Maybe next time.",
    },
    {
      author: { name: 'Jadine Caldwell' },
      text: "I think I'm crying. It's that magical.",
    },
  ],
};

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const lession = FAKE_LESSION;
  res.render('lession', lession);
});

module.exports = router;
