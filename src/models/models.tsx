export const commandLineText = `visitor@kushal's-terminal:~$`;

export const KeyCodes = {
  Home: "Home",
  End: "End",
  Tab: "Tab",
  Enter: "Enter",
  Escape: "Escape",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
};

export const acceptedInputs = [
  "help",
  "about",
  "skills",
  "contacts",
  "projects",
  "clr",
  "cls",
  "clear",
  "history",
  "welcome",
];

export const outputs = {
  help: (
    <pre>
      <span className="white">help</span> - help a list of all available
      commands.
      <br />
      <span className="white">about</span> - Shows a short intro about the
      author.
      <br />
      <span className="white">skills</span> - Shows the technical proficiency of
      the author.
      <br />
      <span className="white">contacts</span> - Shows the contact information of
      the author.
      <br />
      <span className="white">projects</span> - Shows a list of all available
      commands.
      <br />
      <span className="white">cls | clr | clear</span> - Clears the terminal
      window.
      <br />
      <span className="white">history</span> - Shows a list of last 10 inputs.
      <br />
      <span className="white">welcome</span> - Shows the welcome banner of the
      website.
      <br />
    </pre>
  ),
  welcome: (
    <div className="brand">
      <pre className="ascii-art">
        {`
                    .............       
                  .....~^:..    ..      
                 ...7PB#BBG5J~          
                 ..?GGGBBBBPY!:         
                .:!B57^:YY~^:.:         
                 Y7B#G5P#J!!^::         
                 :?P###GG??PY!.         
                  :?PPPJ!:^7~.          
                  :!!55J7^...           
                 .?P7~!~^:..            
               ^:7BBG5~.....            
           ..:.::^P#GPJ~:..  .          
       ..:::::..:::YBBGGP^     . .      
     .::::::::::::..^?GJ:        ....   
    .::.:::::::::::::.^..............   
   ........::::::::::.:...........      
  ..........::::::::............`}
      </pre>
      <div className="brand-name">
        <pre className="brand-name__ascii">
          {`
 █████   ████                    █████                ████   ██        
░░███   ███░                    ░░███                ░░███  ███        
 ░███  ███    █████ ████  █████  ░███████    ██████   ░███ ░░░   █████ 
 ░███████    ░░███ ░███  ███░░   ░███░░███  ░░░░░███  ░███      ███░░  
 ░███░░███    ░███ ░███ ░░█████  ░███ ░███   ███████  ░███     ░░█████ 
 ░███ ░░███   ░███ ░███  ░░░░███ ░███ ░███  ███░░███  ░███      ░░░░███
 █████ ░░████ ░░████████ ██████  ████ █████░░████████ █████     ██████ 
░░░░░   ░░░░   ░░░░░░░░ ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░ ░░░░░     ░░░░░░  
                                                                       
                                                                       
`}
        </pre>
        Built with <span className="red">&#10084;</span>
        <br />
        type <span className="white">help</span> to get the list of commands,
      </div>

      <br />
    </div>
  ),
};

export const loadingMessages = [
  "booting up the system...",
  "checking for updates...",
  "loading user preferences...",
  "bundling NPM packages...",
  "running the compiler...",
  "loading terminal window...",
  "setting up the project...",
];

export const loadingText = `                                                                                           
                                                                       ########                                              
###########                                                            #::::::#  ####                                        
#:::::::::#                                                            #::::::# #::::#                                       
#:::::::::#                                                            #::::::#  ####                                        
##:::::::##                                                            #:::::#                                               
  #:::::#                  ###########     #############       #########:::::# ####### ####  ########       #########   #####
  #:::::#                ##:::::::::::##   #::::::::::::#    ##::::::::::::::# #:::::# #:::##::::::::##    #:::::::::###::::#
  #:::::#               #:::::::::::::::#  #########:::::#  #::::::::::::::::#  #::::# #::::::::::::::##  #:::::::::::::::::#
  #:::::#               #:::::#####:::::#           #::::# #:::::::#####:::::#  #::::# ##:::::::::::::::##::::::#####::::::##
  #:::::#               #::::#     #::::#    #######:::::# #::::::#    #:::::#  #::::#   #:::::####:::::##:::::#     #:::::# 
  #:::::#               #::::#     #::::#  ##::::::::::::# #:::::#     #:::::#  #::::#   #::::#    #::::##:::::#     #:::::# 
  #:::::#               #::::#     #::::# #::::####::::::# #:::::#     #:::::#  #::::#   #::::#    #::::##:::::#     #:::::# 
  #:::::#         #######::::#     #::::##::::#    #:::::# #:::::#     #:::::#  #::::#   #::::#    #::::##::::::#    #:::::# 
##:::::::#########:::::##:::::#####:::::##::::#    #:::::# #::::::#####::::::###::::::#  #::::#    #::::##:::::::#####:::::# 
#::::::::::::::::::::::##:::::::::::::::##:::::####::::::#  #:::::::::::::::::##::::::#  #::::#    #::::# #::::::::::::::::# 
#::::::::::::::::::::::# ##:::::::::::##  #::::::::::##:::#  #:::::::::###::::##::::::#  #::::#    #::::#  ##::::::::::::::# 
########################   ###########     ##########  ####   #########   #############  ######    ######    ########::::::# 
                                                                                                                     #:::::# 
                                                                                                         ######      #:::::# 
                                                                                                         #:::::##   ##:::::# 
                                                                                                          #::::::###:::::::# 
                                                                                                           ##:::::::::::::#  
                                                                                                             ###::::::###    
                                                                                                                ######       
  `;
