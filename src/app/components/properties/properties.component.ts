
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PropertyServiceService } from '../../services/property-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, NgxPaginationModule, FormsModule],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 6;
  properties: any[] = [];
  allProperties: any[] = [];
  filteredProperties: any[] = [];
  loading = false;

  // filter variables
  filterPriceMin: number|null = null;
  filterPriceMax: number|null = null;
  filterCity: string = '';
  filterPurpose: string = '';
  filterCategory: string = '';
  filterBedrooms: number|null = null;
  filterSeller: string = '';

  // search variable
  searchTerm: string = '';

  // for select options
  cities: string[] = [];
  purposes: string[] = [];
  categories: string[] = [];
  sellers: string[] = [];

  constructor(private propertyService: PropertyServiceService) {}

  ngOnInit(): void {
    this.fetchProperties();
  }

  fetchProperties() {
    this.loading = true;
    this.propertyService.getProperties().subscribe({
      next: (res: any) => {
        this.properties = res.data || [];
        this.allProperties = [...this.properties];
        this.filteredProperties = [...this.properties];
        this.cities = Array.from(new Set(this.allProperties.map((p: any) => p.city).filter(Boolean)));
        this.purposes = Array.from(new Set(this.allProperties.map((p: any) => p.purpose).filter(Boolean)));
        this.categories = Array.from(new Set(this.allProperties.map((p: any) => p.category).filter(Boolean)));
        this.sellers = Array.from(new Set(this.allProperties.map((p: any) => p.seller?.name).filter(Boolean)));
        this.loading = false;
      },
      error: (err) => {
        this.properties = [];
        this.allProperties = [];
        this.filteredProperties = [];
        this.loading = false;
      }
    });
  }

  onFilterChange() {
    this.applyFiltersAndSearch();
  }

  resetFilters() {
    this.filterPriceMin = null;
    this.filterPriceMax = null;
    this.filterCity = '';
    this.filterPurpose = '';
    this.filterCategory = '';
    this.filterBedrooms = null;
    this.filterSeller = '';
    this.searchTerm = '';
    this.applyFiltersAndSearch();
  }

  onSearchInput() {
    this.applyFiltersAndSearch();
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFiltersAndSearch();
  }

  private applyFiltersAndSearch() {
    let filtered = [...this.allProperties];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter((property: any) => {
        const propertyName = (property.name || '').toLowerCase();
        const sellerName = (property.seller?.name || '').toLowerCase();
        const category = (property.category || '').toLowerCase();
        
        return propertyName.includes(searchLower) || 
               sellerName.includes(searchLower) || 
               category.includes(searchLower);
      });
    }

    // Apply other filters
    filtered = filtered.filter((p: any) => {
      const price = Number(p.price);
      const priceMinOk = this.filterPriceMin == null || price >= this.filterPriceMin;
      const priceMaxOk = this.filterPriceMax == null || price <= this.filterPriceMax;
      const cityOk = !this.filterCity || p.city === this.filterCity;
      const purposeOk = !this.filterPurpose || p.purpose === this.filterPurpose;
      const categoryOk = !this.filterCategory || p.category === this.filterCategory;
      const bedroomsOk = this.filterBedrooms == null || p.bedrooms == this.filterBedrooms;
      const sellerOk = !this.filterSeller || (p.seller && p.seller.name === this.filterSeller);
      
      return priceMinOk && priceMaxOk && cityOk && purposeOk && categoryOk && bedroomsOk && sellerOk;
    });

    this.filteredProperties = filtered;
    this.currentPage = 1;
  }
}