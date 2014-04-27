module.exports = {
  "User":{
    "id":"User",
    "required": ["local"],
    "properties":{
      "id":{
        "type":"string",
        "description": "User unique identifier"
      },
      "firstname":{
        "type":"string",
        "description": "User first name"
      },
      "lastname":{
        "type":"string",
        "description": "User last name"
      },
      "activities":{
        "type":"array",
        "description": "Users activities",
        "items":{
          "$ref":"Activity",
        }
      },
      "local":{
        "$ref":"Local",
        "description": "Local Authentication"
      }
    }
  },
  "Local":{
    "id":"Local",
    "required": ["email", "password"],
    "properties":{
      "email":{
        "type":"string",
        "description": "users email"
      },
      "password":{
        "type":"string",
        "description": "users password"
      }
    }
  },
  "Activity":{
    "id":"Activity",
    "required": ["activityType", "location", "activityDistance"],
    "properties":{
      "id":{
        "type":"string",
        "description": "Activity unique identifier"
      },
      "activityType":{
        "type":"string",
        "description": "Type of Activity",
        "allowableValues": {
          "valueType": "LIST",
          "values": [
            "Running",
            "Walking",
            "Cycling",
            "Swimming"
          ]
        },
      },
      "location":{
        "type":"string",
        "description": "Location of activity"
      },
      "activityDistance":{
        "type":"integer",
        "format":"int64",
        "description": "Activity Distance"
      }
    }
  },
  "UserFlat":{
    "id":"UserFlat",
    "required": ["email", "password"],
    "properties":{
      "email":{
        "type":"string",
        "description": "User email"
      },
      "password":{
        "type":"string",
        "description": "User password"
      },
      "firstname":{
        "type":"string",
        "description": "User first name"
      },
      "lastname":{
        "type":"string",
        "description": "User last name"
      }
    }
  },
  "UserLogin":{
    "id":"UserLogin",
    "required": ["email", "password"],
    "properties":{
      "email":{
        "type":"string",
        "description": "User email"
      },
      "password":{
        "type":"string",
        "description": "User password"
      }
    }
  }
};