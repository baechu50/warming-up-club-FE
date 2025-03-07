const API_URL = "https://api.github.com/users/";

const getData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

const displayNotFound = () => {
  const profileSection = document.getElementById("profile");
  profileSection.innerHTML = "";

  const notFound = document.createElement("h3");
  notFound.innerText = "User Not Found";
  profileSection.appendChild(notFound);
};

const displayProfile = ({
  avatar_url,
  html_url,
  company,
  blog,
  location,
  created_at,
  public_repos,
  public_gists,
  followers,
  following,
}) => {
  const profileSection = document.getElementById("profile");
  profileSection.innerHTML = "";

  const profile = document.createElement("div");
  profile.innerHTML = `
    <div class="profile-avatar">
      <img src="${avatar_url}" alt="Profile Picture">
      <a href="${html_url}" target="_blank">
       <button class="big-btn">View Profile</button>
      </a>
    </div>
    <div class="profile-info">
      <nav>
        <div class="small-btn">Public Repos: ${public_repos}</div>
        <div class="small-btn">Public Gists: ${public_gists}</div>
        <div class="small-btn">Followers: ${followers}</div>
        <div class="small-btn">Followings: ${following}</div>
      </nav>
      <ul>
        <li>Company: ${company || "Not entered"}</li>
        <li>Blog: ${blog || "Not entered"}</li>
        <li>Location: ${location || "Not entered"}</li>
        <li>Member Since: ${created_at || "Not entered"}</li>
      </ul>
    </div>
  `;

  profileSection.appendChild(profile);
};

const displayRepos = (repoData) => {
  const reposSection = document.getElementById("repos");
  reposSection.innerHTML = "";

  repoData.forEach(
    ({ html_url, name, stargazers_count, watchers_count, forks_count }) => {
      const repo = document.createElement("div");
      repo.classList.add("repo");

      repo.innerHTML = `
        <a href="${html_url}" target="_blank">${name}</a>
        <nav>
        <div class="small-btn">Stars: ${stargazers_count}</div>
        <div class="small-btn">Watchers: ${watchers_count}</div>
        <div class="small-btn">Forks: ${forks_count}</div>
      </nav>
      `;

      reposSection.appendChild(repo);
    }
  );
};

const debounce = (func, delay) => {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const handleInput = async (e) => {
  try {
    const profileData = await getData(`${API_URL}${e.target.value}`);
    const repoData = await getData(`${API_URL}${e.target.value}/repos`);

    displayProfile(profileData);
    displayRepos(repoData);
  } catch (error) {
    console.error(`error fetching data: ${error}`);
    displayNotFound();
  }
};

const input = document.getElementById("name-input");
const debouncedHandleInput = debounce(handleInput, 1000);
input.addEventListener("input", debouncedHandleInput);
