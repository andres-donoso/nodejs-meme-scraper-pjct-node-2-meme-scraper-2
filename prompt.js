import prompt from 'prompt';

prompt.start();

prompt.get(['first name', 'last name'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
});

function onErr(err) {
  console.log(err);
  return 1;
}
