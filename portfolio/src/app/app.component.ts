import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private modalService: NgbModal) {
  }
  ngOnInit(): void {
    //according to loftblog tut
    $(".main-menu li:first").addClass("active");

    var showSection = function showSection(section: any, isAnimate: any) {
      var direction = section.replace(/#/, "");
        let reqSection: any = $(".section").filter(
          '[data-section="' + direction + '"]'
        ),
        reqSectionPos = reqSection.offset().top - 0;

      if (isAnimate) {
        $("body, html").animate(
          {
            scrollTop: reqSectionPos
          },
          800
        );
      } else {
        $("body, html").scrollTop(reqSectionPos);
      }
    };

    var checkSection = function checkSection() {
      $(".section").each(function() {
        var $this: any = $(this),
          topEdge = $this.offset().top - 80,
          bottomEdge = topEdge + $this.height(),
          wScroll: any = $(window).scrollTop();
        if (topEdge < wScroll && bottomEdge > wScroll) {
          var currentId = $this.data("section"),
            reqLink = $("a").filter("[href*=\\#" + currentId + "]");
          reqLink
            .closest("li")
            .addClass("active")
            .siblings()
            .removeClass("active");
        }
      });
    };

    $(".main-menu").on("click", "a", function(e) {
      e.preventDefault();
      showSection($(this).attr("href"), true);
    });

    $(window).scroll(function() {
      checkSection();
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }


}
