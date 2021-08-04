const express = require('express');

const app = express();

app.use(express.json());

const projects = [];

function checkProjectsExists(request, response, next) {
  const { id } = request.params;

  const project = projects.find(project => (project.id = id));

  if (!project) {
    return response.status(400).json({
      error: 'Project not found'
    });
  }

  return next();
}

function logRequests(request, response, next) {
  console.count('Número de requisições');

  return next();
}

app.use(logRequests);

app.get('/projects', (request, response) => {
  return response.json(projects);
});

app.post('/projects', (request, response) => {
  const { id, title } = request.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', checkProjectsExists, (request, response, next) => {
  const { id } = request.params;
  const { title } = request.body;

  const project = projects.find(project => project.id == id);

  project.title = title;

  return response.json(project);
});

app.delete('/projects/:id', checkProjectsExists, (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.find(project => project.id == id);

  projects.slice(projectIndex, 1);

  return response.send();
});

app.post('/projects/:id/tasks', checkProjectsExists, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  const project = projects.findIndex(project => project.id == id);

  projects.tasks.push(title);

  return response.json(project);
});

app.listen(3333, () => {
  console.log('Server Started at http://localhost:3333');
});
