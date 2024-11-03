document.addEventListener('DOMContentLoaded', function() {
    const filterActive = document.getElementById('filter-active');
    const filterCompleted = document.getElementById('filter-completed');
    const activeRequests = document.getElementById('active-requests');
    const completedRequests = document.getElementById('completed-requests');
  
    // Toggle visibility for active/completed requests
    filterActive.addEventListener('change', function() {
      activeRequests.style.display = filterActive.checked ? 'block' : 'none';
    });
    
    filterCompleted.addEventListener('change', function() {
      completedRequests.style.display = filterCompleted.checked ? 'block' : 'none';
    });
  
    // Mark request as completed
    document.querySelectorAll('.mark-completed').forEach(button => {
      button.addEventListener('click', function() {
        this.closest('.request-item').remove();
        completedRequests.appendChild(this.closest('.request-item'));
        this.classList.remove('mark-completed');
        this.classList.add('remove-request');
        this.innerHTML = '<i class="fas fa-trash"></i> Remove';
      });
    });
  
    // Remove completed requests
    document.querySelectorAll('.remove-request').forEach(button => {
      button.addEventListener('click', function() {
        this.closest('.request-item').remove();
      });
    });
  });
  