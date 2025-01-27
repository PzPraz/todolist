import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns'
import { id } from 'date-fns/locale';

function generateUniqueID() {
    return 'task_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

const starterID = generateUniqueID()
console.log(starterID)


function createTaskManager() {
    return {
        tasks: [{
                name:'HEYYA!!', 
                duedate:'2000-3-15', 
                isComplete: false, 
                details: `I'm the creator of this website`, 
                categories: null,
                project: 'Getting Started', 
                id: starterID}],

        projects: [{name: 'Getting Started',
                    tasks: [{name:'HEYYA!!', 
                            duedate:'2000-3-15', 
                            isComplete: false, 
                            details: `I'm the creator of this website`, 
                            categories: null, 
                            project: 'Getting Started', 
                            id: starterID}]}],
        
        addTask(taskName, duedate, taskDetails, projectName){
            const task = {
                name: taskName,
                duedate: parseISO(duedate),
                isComplete: false,
                details: taskDetails,
                categories: this.categorizeTask({ duedate: parseISO(duedate) }),
                project: projectName,
                id: generateUniqueID()
            };

            this.tasks.push(task);

            if(projectName){
                const project = this.projects.find(p => p.name === projectName)
                if (project) {
                    project.tasks.push(task)
                }
            }

        },
        
        getTask(projectName, taskName){
            const project = this.projects.find(p => p.name === projectName)

            if(!project){
                return Task.tasks.find(t => t.name === taskName)
            }

            return project.tasks.find(t => t.name === taskName)

        },

        removeTaskById(id){
            this.tasks = this.tasks.filter(t => t.id !== id)
            this.projects.forEach(p => {
                p.tasks = p.tasks.filter(t => t.id !== id)
            })
        },
        
        getTasksByCategory(category) {
            return this.tasks.filter(task => task.categories.includes(category));
        },

        getTodayTasks(){
            return this.getTasksByCategory('today')
        },

        getWeekTasks(){
            return this.getTasksByCategory('week')
        },

        getMonthTasks(){
            return this.getTasksByCategory('month')
        },

        toggleComplete(taskName) {
            const task = this.tasks.find(t => t.name === taskName);
            task.isComplete =  task.isComplete ? false :  true

        },
        
        removeTask(projectName, taskName){
            const project = this.findProject(projectName)
            if (project){
                this.tasks = this.tasks.filter(task => task.name !== taskName && task.project !== project)
            } else {
                this.tasks = this.tasks.filter(task => task.name !== taskName)
            }
        
    
        },

        categorizeTask(task) {
            const categories = [];
            if (isToday(task.duedate)) categories.push('today');
            if (isThisWeek(task.duedate)) categories.push('week');
            if (isThisMonth(task.duedate)) categories.push('month');
            return categories;
        },

        addProject(projectName){
            if(this.projects.some(p => p.name === projectName)){
                return
            } else{
                this.projects.push({
                    name: projectName,
                    tasks: []
                })
            }
        },

        getProjectTasks(projectName){
            const project = this.projects.find(p => p.name === projectName)
            
            return project.tasks

        },
        
        removeProjectTasks(projectName, taskName){
            const project = this.projects.find(p => p.name === projectName)

            if(project){
                project.tasks = project.tasks.filter(task => task.name !== taskName);
            }
        },
        
        removeProject(projectName){
            this.projects = this.projects.filter(p => p.name !== projectName)
            this.tasks = this.tasks.filter(task => task.project !== projectName)
        },

        findProject(projectName){
            const project = this.projects.find(p => p.name === projectName)

            return project
        },

        saveToJson() {
            const data = {
                tasks: this.tasks.map(task => ({
                    ...task,
                    duedate: task.duedate.toISOString() // Convert date to ISO string for JSON compatibility
                })),
                projects: this.projects.map(project => ({
                    ...project,
                    tasks: project.tasks.map(task => ({
                        ...task,
                        duedate: task.duedate.toISOString()
                    }))
                }))
            };
        
            return JSON.stringify(data);
        },

        loadFromJson(jsonString) {
            const data = JSON.parse(jsonString);
        
            this.tasks = data.tasks.map(task => ({
                ...task,
                duedate: parseISO(task.duedate) // Convert ISO string back to a Date object
            }));
        
            this.projects = data.projects.map(project => ({
                ...project,
                tasks: project.tasks.map(task => ({
                    ...task,
                    duedate: parseISO(task.duedate)
                    // Ensure the task objects have the same structure
                }))
            }));
        },
        
        

    }
}

const Task = createTaskManager()

export { Task }