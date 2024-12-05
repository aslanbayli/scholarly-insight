import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';

function PaperList({ title, authors, summary, link }) {

  return (
          <Card>
            <CardContent>
              <Typography variant="h6">{title}</Typography>
              {authors.map((author, index) => (
                index === 0 ? (
                    <Typography variant="title" key={index}>{author}</Typography>
                ) : (
                    <Typography variant="title" key={index}>, {author}</Typography>
                )
                ))
              }
              <Typography variant="body2">{summary}</Typography>
              <Typography variant="body2"><Link>{link}</Link></Typography>
            </CardContent>
          </Card>
  );
}

export default PaperList;
