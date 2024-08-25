document.addEventListener('DOMContentLoaded', () => {
    const properties = [
      { id: 1, title: "Beach House", description: "Charming beachfront house in Cornwall, offering stunning ocean views, direct beach access, and cozy coastal decor. Perfect for a relaxing seaside getaway.", image: "images/beach-house.jpg", price: 100 },
      { id: 2, title: "Mountain Cabin", description: "Rustic cabin nestled in the serene mountains, offering breathtaking forest views, cozy fireplace, and nearby hiking trails. Ideal for a peaceful nature retreat.", image: "images/mountain-cabin.jpg", price: 150 },
      { id: 3, title: "City Apartment", description: "Modern city apartment in the heart of London, featuring sleek design, high-end amenities, and easy access to shopping, dining, and cultural attractions.", image: "images/city-appartment.avif", price: 200 },
      { id: 4, title: "Apartment", description: "Contemporary apartment in the city center, offering stylish interiors, full kitchen, and balcony views. Perfect for urban explorers and business travelers alike.", image: "images/appartment.jpg", price: 159.99 },
      { id: 5, title: "Flambards", description: "Quaint countryside cottage with charming garden, cozy interiors, and easy access to local attractions. Ideal for a budget-friendly escape to the countryside.", image: "images/card-image-5.webp", price: 79.99 },
      { id: 6, title: "Clambards", description: "Cozy village house with traditional decor, offering a warm ambiance, private garden, and close proximity to the local market. Great for a quiet, relaxing getaway.", image: "images/card-image-6.webp", price: 89.99 },
      { id: 7, title: "Lake House", description: "Tranquil lakeside house with private dock, spacious living areas, and stunning water views. Perfect for fishing enthusiasts and nature lovers.", image: "images/lake-house.jpg", price: 180 },
      { id: 8, title: "Desert Villa", description: "Modern villa located in a desert oasis, featuring luxury amenities, private pool, and breathtaking sunset views. Great for a secluded retreat.", image: "images/desert-villa.jpg", price: 250 },
      { id: 9, title: "Country Barn", description: "Charming renovated barn in the countryside, offering rustic decor, large garden, and a peaceful environment. Ideal for family gatherings.", image: "images/country-barn.jpg", price: 120 },
      { id: 10, title: "Treehouse", description: "Unique treehouse accommodation nestled among the treetops, with stunning views and a cozy interior. Perfect for a romantic getaway.", image: "images/treehouse.jpg", price: 175 },
      { id: 11, title: "Ski Chalet", description: "Luxury ski chalet located near popular slopes, with modern amenities, cozy fireplace, and private hot tub. Ideal for winter sports enthusiasts.", image: "images/ski-chalet.jpg", price: 300 },
      { id: 12, title: "Farmhouse", description: "Spacious farmhouse surrounded by rolling hills and farmland, featuring a large kitchen, outdoor seating area, and barn access.", image: "images/farmhouse.jpg", price: 110 },
      { id: 13, title: "Penthouse Suite", description: "Exclusive penthouse suite in a high-rise building with panoramic city views, luxury furnishings, and a private rooftop terrace.", image: "images/penthouse-suite.jpg", price: 400 },
      { id: 14, title: "Island Bungalow", description: "Secluded island bungalow surrounded by tropical plants, with private beach access and an outdoor shower. Ideal for an exotic escape.", image: "images/island-bungalow.webp", price: 220 },
      { id: 15, title: "Historic Manor", description: "Beautifully restored historic manor with antique furnishings, expansive gardens, and elegant dining rooms. Perfect for a luxurious getaway.", image: "images/historic-manor.jpg", price: 350 }
    ];
  
    const propertyContainer = document.getElementById('property-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const propertyCounter = document.getElementById('property-counter');
    const propertySelect = document.getElementById('property');
    const arrivalDateInput = document.getElementById('arrival');
    const nightsInput = document.getElementById('nights');
    const bookingDetails = document.getElementById('booking-details');
    const bookingDetailsHeader = document.getElementById('booking-details-header');
    const bookingForm = document.getElementById('booking-form');
  
    const propertiesPerPage = 5;
    let currentPage = 0;
  
    // Prevent form submission on Enter key press
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    });
  
    // Function to render properties to the DOM
    const renderProperties = (pageIndex) => {
      propertyContainer.innerHTML = '';
  
      const startIndex = pageIndex * propertiesPerPage;
      const endIndex = Math.min(startIndex + propertiesPerPage, properties.length);
  
      for (let i = startIndex; i < endIndex; i++) {
        const property = properties[i];
        const propertyCard = createPropertyCard(property);
        propertyCard.addEventListener('click', () => handlePropertyCardClick(property.id, propertyCard)); 
        propertyContainer.appendChild(propertyCard);
      }
  
      updatePaginationControls(pageIndex, endIndex);
      updatePropertyCounter(startIndex, endIndex);
  
      // Observe newly created property cards for fade-in effect
      observeCards();
    };
  
    // Function to dynamically populate property dropdown
    const populatePropertySelect = () => {
      propertySelect.innerHTML = '';
  
      properties.forEach(property => {
        const option = document.createElement('option');
        option.value = property.price;
        option.setAttribute('property-name', property.title);
        option.setAttribute('data-id', property.id);
        option.textContent = `${property.title} - £${property.price.toFixed(2)}/night`;
        propertySelect.appendChild(option);
      });
    };
  
    // Create a property card element
    const createPropertyCard = (property) => {
      const propertyCard = document.createElement('div');
      propertyCard.className = 'card-container col-lg-3 col-md-4 col-sm-6 col-7 mb-4 mx-3';
      propertyCard.innerHTML = `
        <div class="card shadow border-dark appear">
          <img src="${property.image}" class="card-img-top border-bottom border-dark" alt="${property.title}" loading="lazy">
          <div class="card-body pb-0">
            <h2 class="text-black mb-0 fs-4 fw-bold mb-2">${property.title}</h2>
            <p class="text-muted">${property.description}</p>
          </div>
          <div class="card-footer bg-white border-top-0 pt-0">
            <div class="row">
              <div class="col-12 p-0 text-start">
                <h3 class="fw-bold mb-0 fs-5 ms-2">£${property.price.toFixed(2)} per night</h3>
              </div>
            </div>
          </div>
        </div>
      `;
      return propertyCard;
    };
  
    // Function to handle property card click
    const handlePropertyCardClick = (propertyId, clickedCard) => {
      const allCards = document.querySelectorAll('.card-container');
      allCards.forEach(card => card.classList.remove('selected'));
  
      clickedCard.classList.add('selected');
      selectPropertyInDropdown(propertyId);
    };
  
    // Function to select property in dropdown based on card click
    const selectPropertyInDropdown = (propertyId) => {
      const options = propertySelect.options;
      for (let i = 0; i < options.length; i++) {
        if (parseInt(options[i].getAttribute('data-id')) === propertyId) {
          propertySelect.selectedIndex = i;
          updateBookingDetails();
          break;
        }
      }
    };
  
    // Function to handle form-select dropdown change
    const handleDropdownChange = () => {
      const selectedPropertyId = parseInt(propertySelect.options[propertySelect.selectedIndex].getAttribute('data-id'));
      highlightSelectedCard(selectedPropertyId);
      updateBookingDetails();
    };
  
    // Function to highlight the selected card based on dropdown selection
    const highlightSelectedCard = (propertyId) => {
      const allCards = document.querySelectorAll('.card-container');
      allCards.forEach(card => {
        const cardPropertyId = parseInt(card.querySelector('.card').getAttribute('data-id'));
        if (cardPropertyId === propertyId) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
    };
  
    const updatePaginationControls = (pageIndex, endIndex) => {
      prevPageButton.style.display = pageIndex === 0 ? 'none' : 'inline-block';
      nextPageButton.style.display = endIndex >= properties.length ? 'none' : 'inline-block';
    };
  
    const updatePropertyCounter = (startIndex, endIndex) => {
      propertyCounter.textContent = `Viewing ${startIndex + 1}-${endIndex} of ${properties.length} properties`;
    };
  
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
    };
  
    const calculateEndDate = (arrivalDate, nights) => {
      const arrival = new Date(arrivalDate);
      arrival.setDate(arrival.getDate() + nights);
      return formatDate(arrival);
    };
  
    const updateBookingDetails = () => {
      const propertyValue = parseFloat(propertySelect.value);
      const propertyName = propertySelect.options[propertySelect.selectedIndex]?.getAttribute('property-name');
      const arrivalDate = arrivalDateInput.value;
      const nights = parseInt(nightsInput.value, 10);
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isArrivalDateValid = new Date(arrivalDate) >= today;
      const isNightsValid = nights > 0;
  
      if (propertyValue && arrivalDate && isArrivalDateValid && isNightsValid) {
        const formattedArrivalDate = formatDate(arrivalDate);
        const endDate = calculateEndDate(arrivalDate, nights);
        const totalPrice = (propertyValue * nights).toFixed(2);
  
        bookingDetails.innerHTML = `<span class="fw-bold text-yellow">${propertyName}</span> from <span class="fw-bold text-yellow">${formattedArrivalDate}</span> to <span class="fw-bold text-yellow">${endDate}</span> for <span class="fw-bold text-yellow">£${totalPrice}</span>`;
        bookingDetails.style.display = 'block'; 
        bookingDetailsHeader.style.display = 'block'; 
      } else {
        bookingDetails.style.display = 'none'; 
        bookingDetailsHeader.style.display = 'none'; 
      }
    };
  
    // Observe each card with IntersectionObserver
    const observeCards = () => {
      const cards = document.querySelectorAll('.appear');
  
      const callback = function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('inview');
          } else {
            entry.target.classList.remove('inview');
          }
        });
      };
  
      const observer = new IntersectionObserver(callback);
  
      cards.forEach(card => {
        observer.observe(card);
      });
    };
  
    // Event listeners
    prevPageButton.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderProperties(currentPage);
      }
    });
  
    nextPageButton.addEventListener('click', () => {
      if ((currentPage + 1) * propertiesPerPage < properties.length) {
        currentPage++;
        renderProperties(currentPage);
      }
    });
  
    propertySelect.addEventListener('change', handleDropdownChange);
    arrivalDateInput.addEventListener('input', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isValid = new Date(arrivalDateInput.value) >= today;
      arrivalDateInput.setCustomValidity(isValid ? '' : 'Please enter today\'s date or a future date.');
      arrivalDateInput.reportValidity();
      updateBookingDetails();
    });
  
    nightsInput.addEventListener('input', () => {
      nightsInput.setCustomValidity('');
      if (nightsInput.value < 1) {
        nightsInput.setCustomValidity('Please enter a number greater than 0.');
      }
      nightsInput.reportValidity();
      updateBookingDetails(); 
    });
  
    // Initial actions
    populatePropertySelect(); 
    renderProperties(currentPage); 
  });
  