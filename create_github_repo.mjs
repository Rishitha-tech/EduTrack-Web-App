import { Octokit } from '@octokit/rest'

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function main() {
  try {
    const octokit = await getUncachableGitHubClient();
    
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}`);
    
    // Create new repository
    const repoName = 'EduTrack-Web-App';
    console.log(`Creating repository: ${repoName}...`);
    
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: 'EduTrack – AI-Assisted Learning Analytics with heatmap-based video engagement insights',
      private: false,
      auto_init: false
    });
    
    console.log(`SUCCESS: Repository created at ${repo.html_url}`);
    console.log(`CLONE_URL: ${repo.clone_url}`);
    console.log(`SSH_URL: ${repo.ssh_url}`);
    console.log(`HTTPS_URL: ${repo.clone_url}`);
    
  } catch (error) {
    if (error.status === 422 && error.message.includes('already exists')) {
      console.log('REPO_EXISTS: Repository already exists');
      const octokit = await getUncachableGitHubClient();
      const { data: user } = await octokit.users.getAuthenticated();
      const repoName = 'EduTrack-Web-App';
      console.log(`CLONE_URL: https://github.com/${user.login}/${repoName}.git`);
    } else {
      console.error('ERROR:', error.message);
      process.exit(1);
    }
  }
}

main();
