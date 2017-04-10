# Murmur ICE REST-API

A RESTful API for [Murmur](https://mumble.info) ICE

**Work in progress**

## Endpoints

| Endpoint              	        |    Arguments                  | Desc                          		            	|
|---                    	        |---                            |---                            		            	|
| **GET**               	        |                               |                               		            	|
|                       	        |                               |                               		            	|
| /servers                          |                               | Returns the Server list                               |
| /servers/:server/user/:user   	| session id                    | Returns the User struct				                |
| /servers/:server/users        	|                               | Returns the full UserMap      		            	|
| /servers/:server/channels     	|                               | Returns the full ChannelMap   			            |
| ...                               | ...                           | ...                                                   |

## Environment variables

| Name          | Default value |
|---            |---            |
| HOST          | localhost     |
| PORT          | 3000          |
| ICE_HOST      | 127.0.0.1     |
| ...           | ...           |

## murmurjsapi

Thanks [https://github.com/spede/murmurjsapi](https://github.com/spede/murmurjsapi) for the inspiration.