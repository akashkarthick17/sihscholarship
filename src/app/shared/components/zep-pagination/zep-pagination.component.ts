import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Logger } from 'app/core/services/logger/logger.service';

@Component({
  selector: 'zep-pagination',
  templateUrl: './zep-pagination.component.html',
  styleUrls: ['./zep-pagination.component.scss']
})
export class ZepPaginationComponent implements OnInit, OnChanges {

  @Output() pageChange = new EventEmitter();
  @Output() firstPage = new EventEmitter();
  @Output() lastPage = new EventEmitter();

  @Input() set setItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.computePagination();
  }
  @Input() set setTotalItems(totalItems: number) {
    this.totalItems = totalItems;
    this.computePagination();
  }
  itemsPerPage: number;
  totalItems: number;

  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;

  totalPages: number;
  currentStartItem: number;
  currentEndItem: number;

  constructor(private logger: Logger) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.currentStartItem = 0;
    this.currentEndItem = 0;
  }

  ngOnInit() {
    this.computePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  computePagination() {
    this.currentPage = 1;
    this.totalPages = this.computeTotalPages();
    console.log('zep-pagination ' + 'totalPages:' + this.totalPages + ', itemsPerPage:' + this.itemsPerPage + ', totalItems' + this.totalItems);
    this.currentStartItem = this.computeStartItem();
    this.currentEndItem = this.computeEndItem();

    this.isFirstPage = true;
    this.firstPage.emit();
    if (this.checkIfLastPage()) {
      this.isLastPage = true;
      this.lastPage.emit();
    } else {
      this.isLastPage = false;
    }

    this.pageChange.emit({
      'currentPage': this.currentPage,
      'isFirstPage': this.isFirstPage,
      'isLastPage': this.isLastPage
    });
  }

  computeTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  computeStartItem(): number {
    return 1 + ((this.currentPage - 1) * this.itemsPerPage);
  }

  computeEndItem(): number {
    if (this.checkIfLastPage()) {
      return this.totalItems;
    } else {
      return this.currentPage * this.itemsPerPage;
    }
  }

  checkIfFirstPage(): boolean {
    if (this.currentPage === 1) {
      return true;
    } else {
      return false;
    }
  }

  checkIfLastPage(): boolean {
    if (this.currentPage >= this.totalPages) {
      return true;
    } else {
      return false;
    }
  }

  goToNextPage() {
    if (!this.checkIfLastPage()) {
      this.currentPage++;
      this.currentStartItem = this.computeStartItem();
      this.currentEndItem = this.computeEndItem();

      this.isFirstPage = false;
      if (this.checkIfLastPage()) {
        this.isLastPage = true;
        this.lastPage.emit();
      } else {
        this.isLastPage = false;
      }

      this.pageChange.emit({
        'currentPage': this.currentPage,
        'isFirstPage': this.isFirstPage,
        'isLastPage': this.isLastPage
      });
    }
  }

  goToPreviousPage() {
    if (!this.checkIfFirstPage()) {
      this.currentPage--;
      this.currentStartItem = this.computeStartItem();
      this.currentEndItem = this.computeEndItem();

      if (this.checkIfFirstPage()) {
        this.isFirstPage = true;
        this.firstPage.emit();
      } else {
        this.isFirstPage = false;
      }
      this.isLastPage = false;

      this.pageChange.emit({
        'currentPage': this.currentPage,
        'isFirstPage': this.isFirstPage,
        'isLastPage': this.isLastPage
      });
    }
  }
}
