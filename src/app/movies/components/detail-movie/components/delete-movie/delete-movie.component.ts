import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '@shared/models/movie.interface';
import { MoviesService } from '@services/movies.service';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html'
})
export class DeleteMovieComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() movie: Movie;

  constructor(private moviesSvc: MoviesService,
              private router: Router) {}

  public delete(): void {
    this.close.emit();

    this.moviesSvc.delete(this.movie.id)
    .subscribe(
      () => {
        this.moviesSvc.deleteMovieStore(this.movie.id);
        this.router.navigate(['/movies']);
      }
    );
  }
}
