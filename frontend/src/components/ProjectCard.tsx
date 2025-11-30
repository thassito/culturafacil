import React from 'react';

// Define the type for the project prop
interface Project {
  id: number;
  name: string;
  agent: string;
  area: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-200 dark:border-gray-700/50 p-4 hover:border-blue-500 transition-colors duration-300">
      <span className="px-2 py-1 bg-red-500/50 dark:bg-red-600/50 text-red-800 dark:text-red-200 text-xs font-semibold rounded-full">
        {project.area}
      </span>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 truncate" title={project.name}>{project.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
        Por: <span className="font-medium text-gray-700 dark:text-gray-300">{project.agent}</span>
      </p>
      <div className="mt-4">
        <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          Ver mais &rarr;
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
