# J ibonRoute App Interface

## 1. User Registration & Profile Management

**Patient Side:**

- Multiple registration methods: phone number, email, or social media accounts
- Profile creation with essential information (name, age, blood group, emergency contacts)
- Medical history storage (allergies, chronic conditions, current medications)
- Multiple patient profiles under one account (for family members)
- Emergency contact integration with auto-notification feature
- Document storage for medical prescriptions and reports

**Hospital/Ambulance Provider Side:**

- Organization verification process with legal documentation
- Ambulance fleet registration (vehicle details, license, fitness certificates)
- Driver and paramedic profile creation with credentials
- Real-time availability status management
- Service area definition and operating hours
- Pricing structure setup for different ambulance types

## 2. Ambulance Booking System

**Booking Flow:**

- Emergency SOS button on homepage for instant booking
- Regular booking with pickup location selection (current location/manual entry)
- Destination selection: specific hospital, nearest hospital, or custom location
- Ambulance type selection (Basic, AC, Paramedic, ICU) with feature descriptions
- Patient condition assessment questionnaire for appropriate ambulance assignment
- Estimated arrival time and fare calculation before confirmation
- Multiple payment options (cash, mobile banking, card payment)

**Ambulance Types in Detail:**

**Basic Ambulance:**

- Standard vehicle with stretcher and basic first aid kit
- Suitable for non-critical patient transport
- Hospital transfers and routine medical transportation
- Lower pricing tier

**AC Ambulance:**

- Climate-controlled environment for patient comfort
- Basic medical equipment and first aid supplies
- Suitable for stable patients requiring comfortable transport
- Mid-range pricing

**Paramedic Ambulance:**

- Equipped with advanced life support equipment (oxygen cylinders, defibrillators, IV
    supplies)
- Trained paramedic staff onboard
- Suitable for semi-critical patients requiring medical monitoring
- Higher pricing tier

**ICU Ambulance:**

- Mobile intensive care unit with ventilators, cardiac monitors, and advanced life support
    systems
- Critical care specialists and a trained medical team
- Suitable for critical patients requiring continuous medical intervention
- Premium pricing tier

## 3. Real-Time Tracking & Communication

**Live Tracking:**

- GPS-enabled real-time ambulance location tracking on a map
- Estimated time of arrival (ETA) with continuous updates
- Route visualization showing current path and destination
- Geofencing alerts when an ambulance enters specific zones

**Communication Features:**

- In-app calling between patient/family and ambulance driver
- Text messaging for sharing critical information
- Emergency broadcast to multiple ambulances if the first choice is unavailable
- Automated status updates (ambulance dispatched, arrived, patient picked up, en route to
    hospital, reached destination)

## 4. AI-Powered Smart Routing

**Traffic Intelligence:**

- Integration with real-time traffic data from Google Maps and local traffic management
    systems
- Historical traffic pattern analysis for Dhaka city
- Prediction algorithms for traffic congestion based on time, day, and events
- Dynamic route recalculation every few minutes

**Smart Navigation Features:**

- Multiple route suggestions with time and distance comparisons
- Priority lane recommendations (where ambulances get right of way)
- Accident and roadblock avoidance based on real-time reports
- Integration with traffic signal systems for potential green corridor creation
- Alternative route suggestions during protests, processions, or special events
- Narrow street and waterlogging alerts during the monsoon season

**Optimization Algorithms:**

- Machine learning models trained on Dhaka's traffic patterns
- Consideration of factors: traffic density, road conditions, signal timings, construction
    zones
- Special routing for VIP movement days or political gatherings
- Hospital proximity analysis for nearest appropriate facility selection

## 5. AI Doctor Assistant

**Pre-Hospital Guidance:**

- Symptom-based emergency assessment chatbot
- First aid instructions based on patient condition
- CPR guidance with video demonstrations
- Bleeding control techniques
- Choking response procedures
- Seizure management guidelines

**During Transport:**

- Patient positioning recommendations based on condition
- Vital sign monitoring guidance for family members
- Warning signs to watch for during transport
- Breathing techniques for anxiety management
- Communication tips for providing information to medical staff

**Post-Booking Assistance:**

- Hospital specialization information (which hospital is best for specific conditions)
- Document preparation checklist
- Insurance claim guidance
- Follow-up care recommendations

**Medical Knowledge Base:**

- Common emergency conditions encyclopedia
- Medication information and interactions
- Hospital department directories
- Emergency contact numbers (poison control, burn units, trauma centers)

**Important Disclaimers:**

- Clear messaging that AI Doctor is supplementary, not a replacement for professional care
- Liability disclaimers
- Encouragement to follow ambulance paramedic instructions over app suggestions

## 6. Hospital Directory & Information

**Comprehensive Hospital Database:**

- All major public and private hospitals in Dhaka
- Hospital specializations (cardiac, neurological, pediatric, trauma, etc.)
- Department-wise information and available services
- Emergency department contact numbers
- Bed availability status (updated by hospital partners)
- ICU and CCU availability real-time data

**Hospital Profiles Include:**

- Complete address with map integration
- Multiple contact numbers (emergency desk, reception, ambulance coordination)
- Available specialists and their schedules
- Medical equipment and facilities list
- Accepted insurance providers
- Patient reviews and ratings
- Average waiting time in the emergency department
- Parking facilities for ambulances
- Visiting hours and patient care policies

**Search & Filter Options:**

- Distance-based sorting (nearest first)
- Specialization filters
- Emergency service availability
- Government vs private facility filters
- Rating-based sorting
- Insurance acceptance filters

## 7. Rating & Review System

**Patient Feedback Structure:**

- Star rating system (1-5 stars) for overall experience
- Separate ratings for: ambulance condition, driver behavior, timeliness, medical assistance
    quality, cleanliness
- Written review section with text input
- Photo upload capability (ambulance interior, equipment condition)
- Anonymous review option for honest feedback
- Response from service provider to address concerns

**Review Display:**

- Average rating prominently displayed on ambulance provider profiles
- Recent reviews section with sorting options (most recent, highest rated, lowest rated)
- Verified booking badge on reviews to prevent fake feedback
- Helpful/unhelpful voting system on reviews
- Report inappropriate review option

**Quality Control:**

- Automated profanity filter
- Review the moderation team for verification
- Provider performance dashboard showing rating trends
- Automatic alerts to providers when ratings drop below the threshold
- Recognition badges for highly-rated providers

## 8. Payment System

**Payment Methods:**

- Cash on service completion
- Mobile Financial Services (bKash, Nagad, Rocket)
- Credit/Debit card payments
- Wallet system with prepaid balance
- Insurance direct billing (for partnered insurance companies)

- Corporate account billing for organizations

**Pricing Transparency:**

- Base fare + per kilometer charge structure clearly displayed
- Different rate cards for different ambulance types
- Surge pricing during extreme demand, with the percentage shown
- Discount codes and promotional offers
- Loyalty points system for frequent users
- Bill breakdown showing all charges

**Financial Features:**

- Digital invoice generation with GST/VAT details
- Payment history and transaction records
- Auto-payment for registered cards
- Split payment option (multiple people sharing cost)
- Refund processing for cancelled bookings

## 9. Emergency Features

**SOS Functionality:**

- One-tap emergency booking bypassing regular flow
- Automatic location sharing with emergency contacts
- Nearest ambulance auto-assignment
- Voice-activated booking for hands-free operation
- Integration with the phone's emergency contact list

**Critical Situation Handling:**

- Priority booking queue for life-threatening emergencies
- Simultaneous alert to multiple ambulances if unavailable
- Direct hospital emergency department notification
- Police/fire service coordination for severe accidents
- Multi-language support for emergency instructions

## 10. Notification System

**Push Notifications:**

- Booking confirmation and ambulance assignment
- Driver details and vehicle number
- Ambulance arrival alerts
- Delay notifications with reasons
- Payment confirmation

- Review reminders
- Promotional offers and health tips

**SMS Backup:**

- Critical updates via SMS for areas with poor internet
- Booking details and ambulance tracking link
- OTP for secure transactions

## 11. Partner Dashboard (Hospital/Ambulance Provider Portal)

**Fleet Management:**

- Add/remove ambulances from the system
- Real-time availability toggle
- Maintenance schedule tracking
- Fuel consumption monitoring
- Vehicle documentation renewal alerts

**Booking Management:**

- Incoming booking requests with accept/decline options
- Active booking tracking
- Booking history and analytics
- Cancellation management with reason tracking

**Financial Dashboard:**

- Earnings summary (daily, weekly, monthly)
- Commission structure transparency
- Payout schedules and bank details
- Tax documentation and reports
- Performance bonuses tracking

**Performance Analytics:**

- Acceptance rate statistics
- Average response time
- Completion rate
- Patient ratings and feedback analysis
- Area-wise demand heatmap

## 12. Admin Panel (JibonRoute Management)

**User Management:**

- Patient account verification and management
- Provider onboarding and verification
- Document approval workflow
- Ban/suspend problematic users

**System Monitoring:**

- Real-time active bookings map view
- Server performance monitoring
- Payment gateway status
- API integration health checks

**Analytics & Reporting:**

- User growth metrics
- Booking trends and patterns
- Revenue analytics
- Popular areas and peak hours
- Ambulance utilization rates
- Customer satisfaction metrics

**Content Management:**

- Hospital information updates
- Health tips and blog management
- App announcement banners
- Promotional campaign management

## 13. Additional Features

**Multi-Language Support:**

- Bengali (primary language for Dhaka users)
- English for international users and medical professionals
- Easy language switching option

**Accessibility Features:**

- Voice commands for visually impaired users
- High contrast mode
- Text-to-speech for important information
- Large text option

**Health Tips & Blog:**

- Regular health awareness articles
- Emergency preparedness guides
- First aid tutorial videos
- Disease prevention tips
- Seasonal health advisories

**Referral Program:**

- Share the app with friends and earn credits
- Provider referral bonuses
- Corporate partnership programs

**Insurance Integration:**

- Direct claim filing for insured patients
- Insurance provider database
- Cashless treatment coordination
- Document upload for claims
