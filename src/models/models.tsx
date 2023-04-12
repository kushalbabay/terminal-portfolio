import React from "react";
export const commandLineText = `visitor@kushal's-terminal:~$`;

export const acceptedInputs = [
  "help",
  "about",
  "skills",
  "contacts",
  "projects",
  "clr",
  "cls",
  "clear",
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
    </pre>
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
