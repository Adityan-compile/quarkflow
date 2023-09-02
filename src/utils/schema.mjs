export default schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the Quarkflow project."
      },
      "version": {
        "type": "string",
        "description": "The version of the project."
      },
      "sleep": {
        "type": "integer",
        "description": "The sleep duration between commands in milliseconds."
      },
      "workflows": {
        "type": "object",
        "description": "Workflows configuration.",
        "additionalProperties": {
          "type": "object",
          "properties": {
            "desc": {
              "type": "string",
              "description": "A description of the workflow."
            },
            "commands": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "An array of commands to be executed as part of the workflow."
            },
            "pre-run": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "An array of commands to run before the main commands of the workflow."
            },
            "post-run": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "An array of commands to run after the main commands of the workflow."
            },
            "env": {
              "type": "object",
              "description": "Environment variables specific to this workflow."
            },
            "webhook": {
              "type": "string",
              "description": "A webhook URL associated with the workflow."
            }
          },
          "required": ["commands", "pre-run", "post-run", "env"]
        }
      },
      "scripts": {
        "type": "object",
        "description": "Scripts configuration",
        "patternProperties": {
          "^[a-zA-Z0-9_-]+$": {
            "type": "string",
            "description": "A custom script definition."
          }
        }
      },
      "env": {
        "type": "object",
        "description": "Global environment variables."
      }
    },
    "required": ["name", "version", "sleep", "scripts", "workflows", "env"],
    "additionalProperties": false
  };
  