export const schema = {
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
        "type": "string",
        "description": "The sleep duration between commands in milliseconds."
      },
      "workflows": {
        "type": "object",
        "description": "Workflows configuration."
        },
      "scripts": {
        "type": "object",
        "description": "Scripts configuration"
      },
      "env": {
        "type": "object",
        "description": "Global environment variables."
      }
    },
    "required": ["name", "version", "sleep", "scripts", "workflows", "env"],
    "additionalProperties": true
  };
  