# How to create AppSync DataLoader

## Getting Started


```sh
# Install Amplify CLI globally
npm install -g @aws-amplify/cli
amplify configure

# Install project and dependencies
git clone https://github.com/sonufrienko/demo-appsync
cd demo-appsync
npm i

# Create a AWS CloudFormation stack
amplify init

# Update the cloud resources (deployment)
amplify push

# Build and publish both the backend and the front end
# Upload React app to the S3 hosting bucket
amplify publish
```

Generate aws-exports.js
```sh
amplify init
# ? Do you want to use an existing environment? **Yes**
# ? Choose the environment you would like to use: **dev**
```
