import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'app-post-ad',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-ad.component.html',
  styleUrl: './post-ad.component.css'
})
export class PostAdComponent {

  @Input() adType: 'room' | 'roommate' = 'room'; // Determines which form to show
  @Output() close = new EventEmitter<void>(); // Tells parent to close modal

  // MAX LENGTH CONSTANT
  readonly DESC_MAX_LENGTH = 500; 

  isSubmitting = false;
  selectedImages: File[] = [];
  imagePreviews: string[] = [];

  // Common Form Data (Matches BaseListing)
  formData: any = {
    location: '',
    city: '',
    description: '',
    rentAmount: 0,
    bhkType: '1BHK',
    floorNumber: 1,
    isFurnished: false,
    hasParking: false,
    waterSupply24x7: false,
    electricityBackup: false,
    
    // Room Specific
    securityDeposit: 0,
    availabilityStatus: 'Available',

    // Roommate Specific
    lookingForGender: 'Any',
    religionPreference: 'No Preference',
    dietaryPreference: 'No Preference',
    currentRoommates: 0,
    neededRoommates: 1
  };

  constructor(private postService: PostService) {}

  // 1. Handle File Selection & Preview
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      // Allow max 5 images total (existing + new)
      const remainingSlots = 5 - this.selectedImages.length;
      
      if (remainingSlots <= 0) {
        alert("You can only upload a maximum of 5 images.");
        return;
      }

      // Loop only up to the remaining slots
      for (let i = 0; i < files.length && i < remainingSlots; i++) {
        const file = files[i];

        // VALIDATION: Check File Type specifically
        if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
            alert('Only JPG and PNG images are allowed.');
            continue; 
        }

        this.selectedImages.push(file);

        // Preview logic
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      
      if (files.length > remainingSlots) {
         alert(`Only the first ${remainingSlots} images were added. Max 5 allowed.`);
      }
    }
    // Reset input so same file can be selected again if needed
    event.target.value = '';
  }

  // 2. PREVENT NEGATIVE NUMBERS (Helper function)
  preventNegative(event: any) {
    // Prevent typing '-', 'e', '+'
    if (event.key === '-' || event.key === 'e' || event.key === '+') {
      event.preventDefault();
    }
  }

  // 2. Remove Image from Selection
  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }
  
  // 3. Submit Form
  onSubmit() {
    // Extra safety check for negative numbers
    if (this.formData.rentAmount < 0 || this.formData.floorNumber < 0) {
      alert("Values cannot be negative.");
      return;
    }

    this.isSubmitting = true;
    
    this.postService.createPost(this.adType, this.formData, this.selectedImages).subscribe({
      next: (res) => {
        alert('Ad Posted Successfully!');
        this.isSubmitting = false;
        this.close.emit(); // Close the modal
      },
      error: (err) => {
        console.error(err);
        alert('Failed to post ad.');
        this.isSubmitting = false;
      }
    });
  }
}
