import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns'
function createTaskManager() {
    return {
        tasks: [],
        projects: [],
        
        addTask(taskName, duedate, taskDetails, projectName){
            const task = {
                name: taskName,
                duedate: parseISO(duedate),
                isComplete: false,
                details: taskDetails,
                categories: this.categorizeTask({ duedate: parseISO(duedate) }),
                project: projectName
            };

            this.tasks.push(task);

            if(projectName){
                const project = this.projects.find(p => p.name === projectName)
                if (project) {
                    project.tasks.push(task)
                }
            }

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

        completeTask(taskName) {
            const task = this.tasks.find(t => t.name === taskName);
            if (task) task.isComplete = true;
        },
        
        removeTask(taskName){
            this.tasks = this.tasks.filter(task => task.name !== taskName);
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

            project.tasks = project.tasks.filter(task => task.name !== taskName);
        },
        
        removeProject(projectName){
            this.projects = this.projects.filter(p => p.name !== projectName)
            this.tasks = this.tasks.filter(task => task.project !== projectName)
        }

    }
}

const Task = createTaskManager()

export { Task }