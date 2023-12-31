# MINIcontrol Core

| Command             | Description |
|:---                 |:---         |
| `/help` | Display help for public commands |
| `//help` | Display help for admin commands |
| `//plugin list`  | displays all plugins currently loaded runtime |
| `//plugin load <name>`  | loads plugin to runtime |
| `//plugin unload <name>`  | unloads plugin from runtime |
| `/serverlogin`    | shows server login |
| `/version` | show version numbers for titlepack, server and controller |

# Admin
When loaded, Admin plugin provides simple chat-driven admin interface for server administration.

## Available commands

### Available in Trackmania2020 and Maniaplanet:

| Command             | Description |
|:---                 |:---         |
| `//modesettings`                  | Open scripted gamemode settings window |
| `//set` [setting] [value]         | Set modesetting                        |

Available globally:
### Players

| Command             | Description |
|:---                 |:---         |
| `//kick` [login]          | Kicks player |
| `//ban` [login]           | Bans a player |
| `//unban` [login]           | unbans a player |
| `//ignore` [login] | Mute player |
| `//unignore` [login] | Unmute player |

### Maps

| Command             | Description |
|:---                 |:---         |
| `//shuffle` | Shuffle the playlist |
| `//wml` [file] | Save the playlist |
| `//rml` [file] | Load a saved playlist |
| `//skip`                  | Skips a map |
| `//res`                   |  Restarts map |
| `//talimit` [seconds] | Sets time limit ta-mode |
| `//remove` [mapid] | Remove a map from the playlist, mapid is optional see /list for mapid |
| `//jump` [mapid] | Remove a map from the playlist, mapid is optional see /list for mapid |

### Server
| Command             | Description |
|:---                 |:---         |
| `//cancel` | Cancel a vote |
| `//er` | End round | 
| `//mode` [rounds,ta,team,laps,cup,stunts] | Sets gamemode (stunts not available for scripted modes) |
| `//setpass` [password] | Sets password for the server, use syntax: "if you need spaces" |
| `//setspecpass` [password] | Sets specator password for the server |
| `//warmup` [nb] | Sets warmup duration |
| `//call` [method] [parameter1] [parameter2] | Call server method |

# Announces
Shows player join and leave messages.

# BestCps
Shows at middle-top best checkpoints time.

# Chat
Customize chat appearance.

# Database
Adds bun:sqlite database for other plugins to use.

# Debugtool

Shows useful memory information ingame and console for developers.

# Dedimania
> [!INFO]
> Only available with TmForever

Adds Dedimania records system for the server.
| Command             | Description |
|:---                 |:---         |
| `/dedirecords` | Shows complete list of records  |

# Fun commands

Adds some funny commands.
| Command             | Description |
|:---                 |:---         |
|`/afk` | Go afk |
|`/bootme` | Boot yourself |
|`/ragequit` | Rage quit |
|`/bwoah` | BWOAH |
|`/gg` |  Good game |
|`/ty` | Thanks |
|`/gn` | Good night |
|`/bb` | Bye |
|`/go` | Go go go |
|`/n1` | Nice one |
|`/nt` | Nice time | 
|`/posture` | Posture Check |
|`/hydrate` | Hydrate Check |

# Maps

Provides mapslist for the server.

| Command             | Description |
|:---                 |:---         |
|`/maps` | show maplist |
|`/list` | show maplist |

# MapWidget

Provides a custom widget to top right edge of screen with current map info.

# Players

Provides a players listing for the server

| Command             | Description |
|:---                 |:---         |
|`/players` | show playerlist |


# Records
> [!CAUTION]
> Depends on database

Provides local records for the server

| Command             | Description |
|:---                 |:---         |
|`/records` | show local records |

# Tmnf_talimit
> [!INFO]
> Only available with TmForever

Provides custom ta timelimit functions for the server, like extends.

# Tmnf_ui
> [!INFO]
> Only available with TmForever

Removes some parts of the UI to make more clean HUD


# TMX

> [!INFO]
> Only available with TmForever and Trackmania2020

Trackmania exchange integration plugin.

| Command             | Description |
|:---                 |:---         |
|`//tmx add <id>` | adds map or comma separated list of maps from tmx |
|`//tmux add <id>` | adds map or comma separated list of maps from tm united exchange |
|`//tmxpack add <id>` | adds mappack  |
|`//tmuxpack add <id>` | adds mappack |

# Votes

Provides voting.

| Command             | Description |
|:---                 |:---         |
|`/skip` | start vote to skip map |
|`/extend` | start vote to extend |
|`/yes` | vote yes |
|`/no` | vote no |
|`//vote <custom,skip,extend> "question here"` | start custom, extend or skip vote |
|`//extend <seconds>` | force extend map in seconds, can be negative |
|`//pass` | force pass vote |
|`//cancel`| force cancel vote |
