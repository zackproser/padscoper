echo "Ensuring all npm-managed depedencies are installed..."; 
echo "This may take a moment if you have not already installed all dependencies"; 
npm i; 
echo "OK - all dependencies are in place...";
./bin/www &
echo "PadScoper now running in the background on localhost:3000..."; 
echo "Attempting to open it for you now..."; 
open http://localhost:3000
echo "You will need to look up the running node process by id to kill it when you are finished."
echo "Thank you for using PadScoper"; 
