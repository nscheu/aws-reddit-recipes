module.exports = {
  apps: [{
    name: 'gifServer',
    script: './gifRecApp/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-13-59-132-177.us-east-2.compute.amazonaws.com',
      key: '/Users/nic/Documents/AmazonWebServicesFiles/keyPair/amazon-instance-keypair.cer',
      ref: 'origin/master',
      repo: 'https://github.com/nscheu/aws-reddit-recipes.git',
      path: '/home/ubuntu/node-server/',
      "post-setup": "ls -la",
      // Commands to execute locally (on the same machine you deploy things)
      // Can be multiple commands separated by the character ";"
      'post-deploy': 'npm install && pm2 startOrRestart gifRecApp/ecosystem.config.js'
    }
  }
}
