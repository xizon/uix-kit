const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/', express.static( 'examples' ));
app.use('/dist', express.static( 'dist' ));

app.get('/',function(req,res) {
	const homepage = path.join(__dirname,'./examples/index.html');
	res.sendFile( homepage );
  });

app.listen(port, () => console.log(`Frontend service listening on port: ${port}, access http://localhost:${port} in the web browser`));
